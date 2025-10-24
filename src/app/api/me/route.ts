import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      preferences: true,
      categories: true,
      transactions: { take: 5, orderBy: { date: "desc" } },
      UserFinanceStats: true,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    onboarded: user.onboarded,
    preferences: user.preferences ?? {},
    categories: user.categories ?? [],
    transactions: user.transactions ?? [],
    summary: user.UserFinanceStats ?? {
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
    },
  });
}
