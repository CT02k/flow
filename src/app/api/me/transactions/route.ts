import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/nextauth";
import { startOfMonth, endOfMonth } from "date-fns";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const body = await req.json();
  const { amount, description, bankAccountId, type, tags } = body;

  if (!amount || !type || !bankAccountId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const transaction = await prisma.$transaction(async (tx) => {
    const newTransaction = await tx.transaction.create({
      data: {
        userId: user.id,
        amount,
        description,
        type,
        bankAccountId,
        tags: tags?.slice(0, 3) ?? [],
      },
    });

    const delta = type === "INCOME" ? amount : -amount;

    await tx.bankAccount.update({
      where: { id: bankAccountId },
      data: { balance: { increment: delta } },
    });

    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    const aggregates = await tx.transaction.groupBy({
      by: ["type"],
      _sum: { amount: true },
      where: {
        userId: user.id,
        date: { gte: start, lte: end },
      },
    });

    const monthlyIncome = Number(
      aggregates.find((a) => a.type === "INCOME")?._sum.amount ?? 0,
    );
    const monthlyExpense = Number(
      aggregates.find((a) => a.type === "EXPENSE")?._sum.amount ?? 0,
    );

    const accounts = await tx.bankAccount.findMany({
      where: { userId: user.id },
      select: { balance: true },
    });

    const totalBalance = accounts.reduce(
      (sum, acc) => sum + Number(acc.balance),
      0,
    );

    await tx.stats.upsert({
      where: { userId: user.id },
      update: { totalBalance, monthlyIncome, monthlyExpense },
      create: { userId: user.id, totalBalance, monthlyIncome, monthlyExpense },
    });

    return newTransaction;
  });

  return NextResponse.json(transaction);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email || "undefined" },
    select: {
      transactions: { orderBy: { date: "desc" } },
    },
  });

  if (!user) {
    return NextResponse.json({ error: true }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
