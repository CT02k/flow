import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/nextauth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const body = await req.json();
  const { amount, description, bankAccountId, type, tags } = body;

  if (!amount || !type)
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      amount,
      description,
      type,
      bankAccountId,
      tags: tags?.slice(0, 3) ?? [],
    },
  });

  return NextResponse.json(transaction);
}
