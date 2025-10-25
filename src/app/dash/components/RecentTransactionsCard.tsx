"use client";

export default function RecentTransactionsCard() {
  enum Type {
    INCOME,
    EXPENSE,
  }

  const transactions = [
    { id: 1, title: "Netflix", type: Type.EXPENSE, amount: -39.9 },
    { id: 2, title: "Freelance", type: Type.INCOME, amount: 1200 },
    { id: 3, title: "Mercado", type: Type.EXPENSE, amount: -230.5 },
    { id: 4, title: "GitHub Sponsor", type: Type.INCOME, amount: 50 },
  ];

  return (
    <div className="bg-zinc-50/50 rounded-lg p-6 border border-white w-80 md:w-148">
      <h2 className="text-lg font-semibold mb-4">Recent</h2>
      <ul className="space-y-3">
        {transactions.map((t) => (
          <li key={t.id} className="flex justify-between text-sm text-zinc-700">
            <span>{t.title}</span>
            <span
              className={`font-semibold ${
                t.amount > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {t.amount > 0 ? "+" : ""}$ {Math.abs(t.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
