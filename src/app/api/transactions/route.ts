import { authOptions } from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { type, amount, currency, description, categoryId, date } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      type,
      amount,
      currency,
      description,
      categoryId,
      date: date ? new Date(date) : new Date(),
    },
  });

  const stats = await prisma.userFinanceStats.upsert({
    where: { userId: user.id },
    update: {
      totalBalance:
        type === "INCOME" ? { increment: amount } : { decrement: amount },
      monthlyIncome: type === "INCOME" ? { increment: amount } : undefined,
      monthlyExpense: type === "EXPENSE" ? { increment: amount } : undefined,
    },
    create: {
      userId: user.id,
      totalBalance: type === "INCOME" ? amount : -amount,
      monthlyIncome: type === "INCOME" ? amount : 0,
      monthlyExpense: type === "EXPENSE" ? amount : 0,
    },
  });

  return NextResponse.json({ transaction, stats });
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId: user!.id },
      include: { category: true },
      orderBy: { date: "desc" },
      skip,
      take: limit,
    }),
    prisma.transaction.count({ where: { userId: user!.id } }),
  ]);

  return NextResponse.json({
    transactions,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
