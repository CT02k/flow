"use client";

import { SessionProvider } from "next-auth/react";
import { IntlProvider } from "next-intl";

import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <IntlProvider locale="en">{children}</IntlProvider>
    </SessionProvider>
  );
}
const formatCurrency = (value: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

console.log(formatCurrency(1000, "USD", "en-US")); // $1,000.00
console.log(formatCurrency(1000, "BRL", "pt-BR")); // R$ 1.000,00
