"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-zinc-50/50 border-b border-white flex p-4 justify-between items-center">
      <Image
        src="/branding/logo_full_default_black.svg"
        alt="Full Logo"
        width={100}
        height={100}
      />
      <ul className="h-fit flex gap-6">
        <Link
          className={`text-zinc-700 link ${pathname === "/dash" ? "active" : ""} text-lg relative transition hover:opacity-80`}
          href="/dash"
        >
          Overview
        </Link>
        <Link
          className={`text-zinc-700 link ${pathname === "/dash/test" ? "active" : ""} text-lg relative transition hover:opacity-80`}
          href="/dash/test"
        >
          Dashboard.Header.test.n1
        </Link>
        <Link
          className={`text-zinc-700 link ${pathname === "/dash/test2" ? "active" : ""} text-lg relative transition hover:opacity-80`}
          href="/dash/test2"
        >
          Dashboard.Header.test.n2
        </Link>
      </ul>
      <button>0</button>
    </header>
  );
}
