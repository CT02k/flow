"use client";

import { detectLocale } from "@/lib/i18n";
import { SessionProvider } from "next-auth/react";
import { Locale, NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState();

  useEffect(() => {
    async function loadMessages() {
      const lcl = await detectLocale();
      const msg = (await import(`@/messages/${lcl}.json`)).default;

      setLocale(lcl);
      setMessages(msg);
    }

    loadMessages();
  }, []);

  if (!messages) {
    return null;
  }

  return (
    <SessionProvider>
      <NextIntlClientProvider
        locale={locale}
        timeZone="America/Sao_Paulo"
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
