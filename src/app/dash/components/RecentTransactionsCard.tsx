"use client";

import Image from "next/image";
import { bankAccounts } from "./BankAccountsCard";

export default function RecentTransactionsCard() {
  enum Type {
    INCOME,
    EXPENSE,
  }

  const transactions = [
    {
      id: 1,
      title: "Netflix",
      bank: 1,
      type: Type.EXPENSE,
      amount: -39.9,
      tags: ["aaaaa"],
    },
    {
      id: 2,
      title: "Freelance",
      bank: 1,
      type: Type.INCOME,
      amount: 1200,
      tags: ["sssas"],
    },
    {
      id: 3,
      title: "Mercado",
      bank: 0,
      type: Type.EXPENSE,
      amount: -230.5,
      tags: ["dddd"],
    },
    {
      id: 4,
      title: "GitHub Sponsor",
      bank: 3,
      type: Type.INCOME,
      amount: 50,
      tags: ["tagaa", "jad"],
    },
  ];

  const getBank = (bankId: number) => {
    return bankAccounts.find((v) => v.id === bankId);
  };

  return (
    <div className="bg-zinc-50/50 flex flex-col rounded-lg px-6 pt-6 border border-white h-84 w-80 md:w-148">
      <h2 className="text-lg font-semibold mb-4">Recent</h2>
      <ul className="space-y-3 h-full overflow-y-scroll pb-6 pr-6">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between text-sm text-zinc-700 bg-zinc-100/50 relative contain-content cursor-pointer select-none transition hover:opacity-70 border border-white p-4 rounded-lg"
          >
            <Image
              src={getBank(t.bank)?.icon || "/banks/generic.svg"}
              alt={`${getBank(t.bank)?.bank} Logo`}
              className="absolute opacity-5"
              height={64}
              width={64}
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold">{t.title}</span>
              <span className="flex gap-1.5">
                {/* <Image
                  src={getBank(t.bank)?.icon || "/banks/generic.svg"}
                  alt={`${getBank(t.bank)?.bank} Logo`}
                  height={16}
                  width={16}
                /> */}
                {getBank(t.bank)?.bank}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`font-semibold ${
                  t.amount > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {t.amount > 0 ? "+" : ""}$ {Math.abs(t.amount).toFixed(2)}
              </span>
              <div className="flex gap-1 mt-1.5">
                {t.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 text-xs w-fit rounded-full bg-white/80 border border-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
