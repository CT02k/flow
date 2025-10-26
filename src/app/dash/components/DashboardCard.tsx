"use client";

import { Plus } from "lucide-react";

interface Props {
  title: string;
  value?: any;
  showValues: boolean;
  onAddIncome?: () => void;
  onAddExpense?: () => void;
  gradientColors: [string, string];
}

export default function DashboardCard({
  title,
  value,
  showValues,
  onAddIncome,
  onAddExpense,
  gradientColors,
}: Props) {
  return (
    <div className="bg-zinc-50 rounded-lg w-80 md:w-96 h-40 p-6 relative flex flex-col justify-center contain-content border border-white overflow-hidden">
      <div className="bg">
        <div
          className={`${gradientColors[0]} w-32 h-32 absolute rounded-full bottom-0 right-0 blur-[128px] -z-10`}
        ></div>
        <div
          className={`${gradientColors[1]} w-32 h-32 absolute rounded-full top-0 left-0 blur-[128px] -z-10`}
        ></div>
      </div>
      <h1 className="text-lg font-medium">{title}</h1>
      <h2 className="text-4xl font-semibold">
        {showValues && value !== undefined ? `$ ${value}` : "••••••"}
      </h2>

      <div className="flex gap-3 mt-3">
        {onAddIncome && !onAddExpense && (
          <button
            onClick={onAddIncome}
            className="h-10 w-10 flex items-center justify-center bg-white/50 border border-white rounded-full cursor-pointer transition hover:opacity-80 absolute bottom-2.5 right-2.5"
          >
            <Plus size={16} />
          </button>
        )}
        {onAddExpense && !onAddIncome && (
          <button
            onClick={onAddExpense}
            className="h-10 w-10 flex items-center justify-center bg-white/50 border border-white rounded-full cursor-pointer transition hover:opacity-80 absolute bottom-2.5 right-2.5"
          >
            <Plus size={16} />
          </button>
        )}
        {onAddIncome && onAddExpense && (
          <>
            <button
              onClick={onAddIncome}
              className="px-4 py-2 bg-white/30 border border-white rounded-lg cursor-pointer transition hover:opacity-80"
            >
              Add income
            </button>

            <button
              onClick={onAddExpense}
              className="px-4 py-2 bg-white/30 border border-white rounded-lg cursor-pointer transition hover:opacity-80"
            >
              Add expense
            </button>
          </>
        )}
      </div>
    </div>
  );
}
