import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email || "undefined",
    },
    select: {
      transactions: { take: 5, orderBy: { date: "desc" } },
      categories: true,
      preferences: true,
      stats: true,
      onboarded: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: true }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
