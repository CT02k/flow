#!/usr/bin/env ts-node
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No users.");
    return;
  }

  await prisma.bankAccount.createMany({
    data: [
      {
        userId: user.id,
        name: "Nubank",
        color: "#820AD1",
        icon: "/banks/nubank.svg",
        balance: 2500,
      },
      {
        userId: user.id,
        name: "Safra",
        color: "#0000FF",
        icon: "/banks/safra.svg",
        balance: 4700,
      },
      {
        userId: user.id,
        name: "Inter",
        color: "#FF7A00",
        icon: "/banks/inter.svg",
        balance: 1500,
      },
    ],
  });

  console.log("Completed seed");
}

main().finally(() => prisma.$disconnect());
