import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/nextauth";
import { startOfMonth, endOfMonth } from "date-fns";

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

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance),
    0,
  );

  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const aggregates = await prisma.transaction.groupBy({
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

  const response = {
    totalBalance,
    accounts,
    monthlyIncome,
    monthlyExpense,
  };

  await prisma.stats.upsert({
    where: { userId: user.id },
    update: {
      totalBalance,
      monthlyIncome,
      monthlyExpense,
    },
    create: {
      userId: user.id,
      totalBalance,
      monthlyIncome,
      monthlyExpense,
    },
  });

  //Maybe create a cache in future?

  return NextResponse.json(response);
}
