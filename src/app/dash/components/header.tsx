"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("Dashboard.Header");
  return (
    <header className="w-full bg-zinc-900 flex p-4 justify-between items-center">
      <Image
        src="/branding/logo_full_white.svg"
        alt="Full Logo"
        width={100}
        height={100}
      />
      <ul className="h-fit ">
        <Link
          className="text-zinc-200 group text-lg has-data-active:text-white has-data-active:font-semibold relative"
          href="/dash"
          data-active={location.pathname === "/dash"}
        >
          {t("overview")}
          <div
            data-active
            className="h-0.5 absolute w-0 group-hover:w-full group-has-data-active:w-full group-has-data-active:bg-white transition-all rounded-full bg-zinc-200"
          ></div>
        </Link>
      </ul>
      <button>0</button>
    </header>
  );
}
