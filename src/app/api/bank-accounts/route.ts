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
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const accounts = await prisma.bankAccount.findMany({
    where: { userId: user.id },
    select: { id: true, name: true, color: true, balance: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(accounts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  const { name, color, icon } = await req.json();

  if (!name)
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

  const account = await prisma.bankAccount.create({
    data: {
      userId: user.id,
      name,
      color,
      icon,
    },
  });

  return NextResponse.json(account);
}
