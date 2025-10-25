"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface Props {
  showValues: boolean;
  setShowValues: (v: boolean) => void;
}

export const bankAccounts = [
  {
    id: 0,
    bank: "Nubank",
    color: "#820AD1",
    icon: "/banks/nubank.svg",
    balance: 12000.5,
  },
  {
    id: 1,
    bank: "Safra",
    color: "#1E2044",
    icon: "/banks/safra.svg",
    balance: 8283.33,
  },
  {
    id: 2,
    bank: "PayPal",
    color: "#002991",
    icon: "/banks/paypal.svg",
    balance: 8530.23,
  },
  {
    id: 3,
    bank: "PicPay",
    color: "#21C25E",
    icon: "/banks/picpay.svg",
    balance: 0,
  },
  {
    id: 4,
    bank: "PayPic",
    color: "#21C25E",
    icon: "/banks/picpay.svg",
    balance: 2,
  },
];

export default function BankAccountsCard({ showValues, setShowValues }: Props) {
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
        {bankAccounts.map((acc, i) => (
          <li key={i} className="flex justify-between mr-5">
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
      <div className="flex justify-center py-3">
        <button className="bg-white/70 rounded-lg border border-white w-full py-2 transition cursor-pointer hover:opacity-80">
          Manage Accounts
        </button>
      </div>
    </div>
  );
}
