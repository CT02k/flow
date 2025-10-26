"use client";

import { Category, Transaction, Preferences } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardCard from "@/app/dash/components/DashboardCard";
import BankAccountsCard from "@/app/dash/components/BankAccountsCard";
import TransactionDrawer from "@/app/dash/components/TransactionDrawer";
import RecentTransactionsCard from "@/app/dash/components/RecentTransactionsCard";

interface UserData {
  transactions: Transaction[];
  categories: Category[];
  preferences: Preferences;
  onboarded: boolean;
}

interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  accounts: {
    id: string;
    name: string;
    icon: string;
    color: string;
    balance: number;
  }[];
}

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [showValues, setShowValues] = useState(true);
  const [incomeDrawerOpen, setIncomeDrawerOpen] = useState(false);
  const [expenseDrawerOpen, setExpenseDrawerOpen] = useState(false);

  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) setGreeting("morning");
    else if (hours >= 12 && hours < 18) setGreeting("afternoon");
    else setGreeting("evening");
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchDashboard() {
      const res = await fetch("/api/me/stats");
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    }
    fetchDashboard();
  }, []);

  const totalBalance = dashboardData?.totalBalance ?? 0;
  const monthlyIncome = dashboardData?.monthlyIncome ?? 0;
  const monthlyExpense = dashboardData?.monthlyExpense ?? 0;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-zinc-700 mt-8">
        {greeting && (
          <>
            Good {greeting},
            <p className="text-4xl text-black font-semibold">
              {user?.name || "User"}{" "}
              {greeting === "morning"
                ? "☁️"
                : greeting === "afternoon"
                  ? "☀️"
                  : "🌙"}
            </p>
          </>
        )}
      </h1>

      <div className="w-full flex flex-wrap justify-center gap-8 rounded-lg mt-8">
        <DashboardCard
          title="Total Balance"
          value={showValues ? totalBalance.toFixed(2) : undefined}
          showValues={showValues}
          onAddIncome={() => setIncomeDrawerOpen(true)}
          onAddExpense={() => setExpenseDrawerOpen(true)}
          gradientColors={["bg-zinc-500/50", "bg-zinc-900/50"]}
        />

        <DashboardCard
          title="Monthly Income"
          value={showValues ? monthlyIncome.toFixed(2) : undefined}
          showValues={showValues}
          onAddIncome={() => setIncomeDrawerOpen(true)}
          gradientColors={["bg-green-500/50", "bg-blue-500/50"]}
        />

        <DashboardCard
          title="Monthly Expense"
          value={showValues ? monthlyExpense.toFixed(2) : 0}
          showValues={showValues}
          onAddExpense={() => setExpenseDrawerOpen(true)}
          gradientColors={["bg-orange-500/50", "bg-red-500/50"]}
        />
      </div>

      <div className="flex justify-center gap-8 mt-16 w-full flex-wrap">
        <RecentTransactionsCard transactions={userData?.transactions || []} />
        <BankAccountsCard
          showValues={showValues}
          setShowValues={setShowValues}
        />
      </div>

      <TransactionDrawer
        open={incomeDrawerOpen}
        setOpen={setIncomeDrawerOpen}
        type="INCOME"
      />
      <TransactionDrawer
        open={expenseDrawerOpen}
        setOpen={setExpenseDrawerOpen}
        type="EXPENSE"
      />
    </div>
  );
}
