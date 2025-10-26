"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BankAccount } from "@prisma/client";
import BankAccountCreateDrawer from "./CreateBankAccountDrawer";

interface Props {
  showValues: boolean;
  setShowValues: (v: boolean) => void;
}

export default function BankAccountsCard({ showValues, setShowValues }: Props) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/me/bank-accounts");
      const data = await res.json();
      setAccounts(data);
    }
    loadAccounts();
  }, []);
  return (
    <div className="bg-zinc-50/50 rounded-lg p-6 pb-0 border border-white w-80 md:w-148 h-84 relative flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Accounts</h2>
        <button
          onClick={() => setShowValues(!showValues)}
          className="text-zinc-500 hover:text-zinc-700 transition cursor-pointer"
        >
          {showValues ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <ul className="space-y-3 overflow-y-scroll h-full pb-6">
        {accounts.map((acc, i) => (
          <li key={i} className="flex justify-between mr-5">
            <div className="flex gap-3">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{ background: acc.color }}
              >
                <Image
                  src={acc.icon}
                  alt={`${acc.name} Logo`}
                  className="size-8 brightness-0 invert"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-900 font-medium">{acc.name}</span>

                <span className="text-zinc-700 text-sm">Bank Account</span>
              </div>
            </div>
            <span className="font-semibold">
              {showValues ? `$ ${acc.balance}` : "••••••"}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center py-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-white/70 rounded-lg border border-white w-full py-2 transition cursor-pointer hover:opacity-80"
        >
          Create Account
        </button>
      </div>

      <BankAccountCreateDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        onCreated={() => {}}
      />
    </div>
  );
}
