"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BankAccount, Transaction } from "@prisma/client";
import { useBank } from "@/lib/getBank";
import { Tag } from "lucide-react";
import Link from "next/link";

export default function RecentTransactionsCard({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const { getBank } = useBank(accounts);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/me/bank-accounts");
      const data = await res.json();
      setAccounts(data);
    }
    loadAccounts();
  }, []);

  return (
    <div className="bg-zinc-50/50 flex flex-col rounded-lg px-6 pt-6 border border-white h-84 w-80 md:w-148">
      <h2 className="text-lg font-semibold mb-4">Recent</h2>
      <ul className="space-y-3 h-full overflow-y-scroll pb-6 pr-6">
        {transactions.map((t) => (
          <Link
            key={t.id}
            href={`/dash/transactions?tx=${t.id}`}
            className="flex justify-between text-sm text-zinc-700 bg-zinc-100/50 relative contain-content cursor-pointer select-none transition hover:opacity-70 border border-white p-4 rounded-lg"
          >
            <Image
              src={
                getBank(t.bankAccountId as string)?.icon || "/banks/generic.svg"
              }
              alt={`${getBank(t.bankAccountId as string)?.name} Logo`}
              className="absolute opacity-10 brightness-0"
              height={64}
              width={64}
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold">{t.description}</span>
              <span className="flex gap-1.5">
                {/* <Image
                  src={getBank(t.bank)?.icon || "/banks/generic.svg"}
                  alt={`${getBank(t.bank)?.bank} Logo`}
                  height={16}
                  width={16}
                /> */}
                {getBank(t.bankAccountId as string)?.name}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`font-semibold ${
                  Number(t.amount) > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {Number(t.amount) > 0 ? "+" : ""}${" "}
                {Math.abs(Number(t.amount)).toFixed(2)}
              </span>
              <div className="flex gap-1 mt-1.5">
                {t.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 text-xs w-fit rounded-full bg-white/50 border border-white"
                  >
                    <Tag size={12} className="inline" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
