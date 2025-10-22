"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Component() {
  const t = useTranslations("SignIn");
  const { data: session } = useSession();
  const router = useRouter();

  //   if (session) {
  //     return router.push("/dash");
  //   }

  return (
    <div className="flex w-full h-screen items-center justify-center bg-zinc-2001">
      <div className="providers flex flex-col gap-3">
        <button>
          {t("signInWith", {
            provider: "sexo",
          })}
        </button>
      </div>
    </div>
  );
}
