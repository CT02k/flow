"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("Dashboard.Header");
  return (
    <header className="w-full bg-zinc-50/50 border-b border-white flex p-4 justify-between items-center">
      <Image
        src="/branding/logo_full_white.svg"
        alt="Full Logo"
        width={100}
        height={100}
      />
      <ul className="h-fit flex gap-6">
        <Link
          className={`text-zinc-700 link ${location.pathname === "/dash" && "active"} text-lg has-data-active:text-zinc-950 has-data-active:font-semibold relative transition hover:opacity-80`}
          href="/dash"
        >
          {t("overview")}
          <div className="h-0.5 absolute w-0 line transition-all rounded-full bg-zinc-700"></div>
        </Link>
        <Link
          className={`text-zinc-700 link ${location.pathname === "/dash/test" && "active"} text-lg has-data-active:text-zinc-950 has-data-active:font-semibold relative transition hover:opacity-80`}
          href="/dash/test"
        >
          Dashboard.Header.test.n1
          <div className="h-0.5 absolute w-0 line transition-all rounded-full bg-zinc-700"></div>
        </Link>
        <Link
          className={`text-zinc-700 link ${location.pathname === "/dash/test2" && "active"} text-lg has-data-active:text-zinc-950 has-data-active:font-semibold relative transition hover:opacity-80`}
          href="/dash/test2"
        >
          Dashboard.Header.test.n2
          <div className="h-0.5 absolute w-0 line transition-all rounded-full bg-zinc-700"></div>
        </Link>
      </ul>
      <button>0</button>
    </header>
  );
}
