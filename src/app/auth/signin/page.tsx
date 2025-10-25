"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { siDiscord, siGithub, SimpleIcon } from "simple-icons";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export interface Provider {
  icon?: SimpleIcon;
  name: string;
  value: string;
  colors: string[];
}

const providers: Provider[] = [
  {
    icon: siDiscord,
    name: "Discord",
    value: "discord",
    colors: [
      "bg-[#5865f2]",
      "text-white",
      "hover:not-disabled:bg-[#5865f2]/90",
      "fill-white",
    ],
  },
  {
    icon: siGithub,
    name: "GitHub",
    value: "github",
    colors: [
      "bg-black",
      "text-white",
      "hover:not-disabled:bg-black/90",
      "fill-white",
    ],
  },
];

export default function Component() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState({ state: false, provider: "" });

  useEffect(() => {
    if (session) router.push("/dash");
  }, [session, router]);

  if (session) return null;

  return (
    <div className="flex flex-row gap-5 w-full h-screen items-center justify-start bg-zinc-200">
      <div className="w-1/2 flex flex-col items-center">
        <Image
          src="/branding/logo_full_default_black.svg"
          alt="Full Logo"
          width={200}
          height={100}
        />
        <div className="providers flex flex-col mt-10 gap-3 w-72 h-40">
          {providers.map((p) => (
            <button
              key={p.value}
              onClick={() => {
                setLoading({
                  state: true,
                  provider: p.value,
                });
                signIn(p.value);
              }}
              className={`${p.colors.join(" ")} flex items-center justify-center py-2.5 rounded-lg cursor-pointer transition disabled:cursor-auto disabled:opacity-50`}
              disabled={loading.state}
            >
              {loading.state && loading.provider === p.value ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {p.icon && (
                    <span
                      className="inline-block w-5 h-5 mr-2"
                      dangerouslySetInnerHTML={{ __html: p.icon.svg }}
                    />
                  )}
                  Sign with {p.name}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-linear-to-b from-[#00EA8D] to-[#2A005E] h-full w-1/2 flex flex-col items-center justify-center"></div>
    </div>
  );
}
