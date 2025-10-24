"use client";
import { Category, Transaction, UserPreferences } from "@prisma/client";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface UserData {
  transactions: Transaction[];
  categories: Category[];
  preferences: UserPreferences;
  onboarded: boolean;
}

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const t = useTranslations("Dashboard.Overview");

  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting("Greetings.morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Greetings.afternoon");
    } else {
      setGreeting("Greetings.evening");
    }
  }, []);

  useEffect(() => {
    async function setData() {
      const res = await fetch("/api/me");
      const data = await res.json();

      setUserData(data);
    }

    setData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-zinc-700 mt-8">
        {t.rich(greeting, {
          nameTag: (chunks) => (
            <p className="text-4xl text-black font-semibold">{chunks}</p>
          ),
          name: user?.name || "undefined",
        })}
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-8 rounded-lg mt-8">
        <div className="bg-zinc-50 rounded-lg w-80 md:w-96 h-40 p-6 relative contain-content flex flex-col justify-center border border-white">
          <div className="bg">
            <div className="bg-zinc-500 w-32 h-32 absolute rounded-full bottom-0 right-0 blur-[128px] -z-10"></div>
            <div className="bg-zinc-900 w-32 h-32 absolute rounded-full top-0 left-0 blur-[128px] -z-10"></div>
          </div>
          <h1 className="text-lg font">{t("totalBalance")}</h1>
          <h2 className="text-4xl font">R$ 121.339.311,21</h2>
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2 bg-white/30 border border-white rounded-lg cursor-pointer transition hover:opacity-80">
              Add income
            </button>
            <button className="px-4 py-2 bg-white/30 border border-white rounded-lg cursor-pointer transition hover:opacity-80">
              Add expense
            </button>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-lg w-80 md:w-96 h-40 p-6 relative contain-content flex flex-col justify-center border border-white">
          <div className="bg">
            <div className="bg-blue-500 w-32 h-32 absolute rounded-full bottom-0 right-0 blur-[128px] -z-10"></div>
            <div className="bg-green-500 w-32 h-32 absolute rounded-full top-0 left-0 blur-[128px] -z-10"></div>
          </div>
          <h1 className="text-lg font">{t("monthlyIncome")}</h1>
          <h2 className="text-4xl font">R$ 191.339.311,21</h2>
          <div className="flex gap-3 mt-3">
            <button className="h-10 w-10 flex items-center justify-center bg-white/50 border border-white rounded-full cursor-pointer transition hover:opacity-80 absolute bottom-2.5 right-2.5">
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-lg w-80 md:w-96 h-40 p-6 relative contain-content flex flex-col justify-center border border-white">
          <div className="bg">
            <div className="bg-red-500 w-32 h-32 absolute rounded-full bottom-0 right-0 blur-[128px] -z-10"></div>
            <div className="bg-orange-500 w-32 h-32 absolute rounded-full top-0 left-0 blur-[128px] -z-10"></div>
          </div>
          <h1 className="text-lg font">{t("monthlyExpense")}</h1>
          <h2 className="text-4xl font">R$ 31.339.311,21</h2>
          <div className="flex gap-3 mt-3">
            <button className="h-10 w-10 flex items-center justify-center bg-white/50 border border-white rounded-full cursor-pointer transition hover:opacity-80 absolute bottom-2.5 right-2.5">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-16 mt-16">
        <div className="h-96 w-full flex bg-zinc-50 rounded-lg "></div>
        <div className="h-96 w-full flex bg-zinc-50 rounded-lg "></div>
      </div>
    </div>
  );
}
