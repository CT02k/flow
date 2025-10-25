"use client";

import { Category, Transaction, Preferences } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardCard from "@/app/dash/components/DashboardCard";
import BankAccountsCard from "@/app/dash/components/BankAccountsCard";
import ExpenseDrawer from "@/app/dash/components/ExpenseDrawer";
import IncomeDrawer from "@/app/dash/components/IncomeDrawer";
import RecentTransactionsCard from "@/app/dash/components/RecentTransactionsCard";

interface UserData {
  transactions: Transaction[];
  categories: Category[];
  preferences: Preferences;
  onboarded: boolean;
}

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [showValues, setShowValues] = useState(true);
  const [incomeDrawerOpen, setIncomeDrawerOpen] = useState(false);
  const [expenseDrawerOpen, setExpenseDrawerOpen] = useState(false);

  const { data } = useSession();
  const user = data?.user;

  // Placeholder values
  const totalBalance = 121339311.21;
  const monthlyIncome = 191339311.21;
  const monthlyExpense = 31339311.21;

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) setGreeting("morning");
    else if (hours >= 12 && hours < 18) setGreeting("afternoon");
    else setGreeting("evening");
  }, []);

  useEffect(() => {
    async function setData() {
      const res = await fetch("/api/me");
      const data = await res.json();
      setUserData(data);
    }
    setData();
    console.log(userData);
  });

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
          value={showValues ? totalBalance : undefined}
          showValues={showValues}
          // onAddIncome={() => setIncomeDrawerOpen(true)}
          // onAddExpense={() => setExpenseDrawerOpen(true)}
          gradientColors={["bg-zinc-500/50", "bg-zinc-900/50"]}
        />

        <DashboardCard
          title="Monthly Income"
          value={showValues ? monthlyIncome : undefined}
          showValues={showValues}
          onAddIncome={() => setIncomeDrawerOpen(true)}
          gradientColors={["bg-green-500/50", "bg-blue-500/50"]}
        />

        <DashboardCard
          title="Monthly Expense"
          value={showValues ? monthlyExpense : undefined}
          showValues={showValues}
          onAddExpense={() => setExpenseDrawerOpen(true)}
          gradientColors={["bg-orange-500/50", "bg-red-500/50"]}
        />
      </div>

      <div className="flex justify-center gap-8 mt-16 w-full flex-wrap">
        <RecentTransactionsCard />
        <BankAccountsCard
          showValues={showValues}
          setShowValues={setShowValues}
        />
      </div>

      <IncomeDrawer open={incomeDrawerOpen} setOpen={setIncomeDrawerOpen} />
      <ExpenseDrawer open={expenseDrawerOpen} setOpen={setExpenseDrawerOpen} />
    </div>
  );
}
