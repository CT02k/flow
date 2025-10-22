"use client";

import { detectLocale } from "@/lib/i18n";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";

import { ReactNode, use } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const locale = use(detectLocale());

  const messages = use(import(`@/messages/${locale}.json`)).default;
  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
