"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface Props {
  showValues: boolean;
  setShowValues: (v: boolean) => void;
}

export default function BankAccountsCard({ showValues, setShowValues }: Props) {
  const bankAccounts = [
    {
      bank: "Nubank",
      color: "#820AD1",
      icon: "/banks/nubank.svg",
      balance: 12000.5,
    },
    {
      bank: "PayPal",
      color: "#002991",
      icon: "/banks/paypal.svg",
      balance: 8530.23,
    },
    {
      bank: "PicPay",
      color: "#21C25E",
      icon: "/banks/picpay.svg",
      balance: 0,
    },
  ];

  return (
    <div className="bg-zinc-50/50 rounded-lg p-6 border border-white w-80 md:w-148 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Accounts</h2>
        <button
          onClick={() => setShowValues(!showValues)}
          className="text-zinc-500 hover:text-zinc-700 transition cursor-pointer"
        >
          {showValues ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <ul className="space-y-3">
        {bankAccounts.map((acc, i) => (
          <li key={i} className="flex justify-between">
            <div className="flex gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: acc.color }}
              >
                <Image
                  src={acc.icon}
                  alt={`${acc.bank} Logo`}
                  className="size-6 invert-100"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-900 font-medium">{acc.bank}</span>

                <span className="text-zinc-700 text-sm">Bank Account</span>
              </div>
            </div>
            <span className="font-semibold">
              {showValues ? `$ ${acc.balance.toFixed(2)}` : "••••••"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
