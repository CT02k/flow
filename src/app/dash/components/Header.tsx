"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-zinc-50/50 border-b border-white flex px-4 h-18 justify-between items-center">
      <Image
        src="/branding/logo_full_default_black.svg"
        alt="Full Logo"
        width={100}
        height={100}
      />
      <ul className="h-full flex items-center gap-6">
        <Link
          className={`text-zinc-900 group ${pathname === "/dash" && "font-semibold"} text-lg relative h-full flex items-center transition hover:opacity-80`}
          href="/dash"
        >
          Overview
          <div
            className={`w-0 h-1 ${pathname === "/dash" && "w-full"} group-hover:w-full transition-all rounded-t-lg bg-black absolute bottom-0`}
          ></div>
        </Link>
        <Link
          className={`text-zinc-700 group ${pathname === "/dash/transactions" && "font-semibold"} text-lg relative h-full flex items-center transition hover:opacity-80`}
          href="/dash/transactions"
        >
          Transactions
          <div
            className={`w-0 h-1 ${pathname === "/dash/transactions" && "w-full"} group-hover:w-full transition-all rounded-t-lg bg-black absolute bottom-0`}
          ></div>
        </Link>
        <Link
          className={`text-zinc-700 group ${pathname === "/dash/test2" && "font-semibold"} text-lg relative h-full flex items-center transition hover:opacity-80`}
          href="/dash/test2"
        >
          Dashboard.Header.test.n2
          <div
            className={`w-0 h-1 ${pathname === "/dash/test2" && "w-full"} group-hover:w-full transition-all rounded-t-lg bg-black absolute bottom-0`}
          ></div>
        </Link>
      </ul>
      <button>0</button>
    </header>
  );
}
