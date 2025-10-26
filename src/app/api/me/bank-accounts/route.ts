import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/nextauth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const accounts = await prisma.bankAccount.findMany({
    where: { userId: user.id },
    select: { id: true, name: true, icon: true, color: true, balance: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(accounts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const body = await req.json();
  const { name, color, icon } = body;

  if (!name) {
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

  const result = await prisma.$transaction(async (tx) => {
    const account = await tx.bankAccount.create({
      data: {
        userId: user.id,
        name: name.trim(),
        color,
        icon,
        balance: 0,
      },
    });

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
      update: { totalBalance },
      create: {
        userId: user.id,
        totalBalance,
        monthlyIncome: 0,
        monthlyExpense: 0,
      },
    });

    return account;
  });

  return NextResponse.json(result);
}
