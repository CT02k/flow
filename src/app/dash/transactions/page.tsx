"use client";

import { useEffect, useMemo, useState } from "react";
import { BankAccount, Transaction } from "@prisma/client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Edit,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  Tag,
} from "lucide-react";
import TransactionEditDrawer from "./components/TransactionEditDrawer";
import { toast } from "sonner";
import { useBank } from "@/lib/getBank";
import { useRouter, useSearchParams } from "next/navigation";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">(
    "ALL",
  );
  const [sortOrder, setSortOrder] = useState<
    "NEWEST" | "OLDEST" | "HIGHEST" | "LOWEST"
  >("NEWEST");
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const txQuery = searchParams.get("tx") || "";

  useEffect(() => {
    if (!txQuery || transactions.length === 0) return;

    const found = transactions.find((tx) => tx.id === txQuery);
    if (found) setEditTx(found);
  }, [txQuery, transactions]);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/me/bank-accounts");
      const data = await res.json();
      setAccounts(data);
    }
    loadAccounts();
  }, []);

  const { getBank } = useBank(accounts);

  async function fetchTransactions() {
    setLoading(true);
    try {
      const res = await fetch("/api/me/transactions");
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let list = [...transactions];
    if (filterType !== "ALL")
      list = list.filter((tx) => tx.type === filterType);
    if (search) {
      list = list.filter(
        (tx) =>
          (tx.description &&
            tx.description.toLowerCase().includes(search.toLowerCase())) ||
          tx.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      );
    }
    if (sortOrder === "NEWEST")
      list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sortOrder === "OLDEST")
      list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sortOrder === "HIGHEST")
      list.sort((a, b) => Number(b.amount) - Number(a.amount));
    if (sortOrder === "LOWEST")
      list.sort((a, b) => Number(a.amount) - Number(b.amount));

    setFiltered(list);
  }, [transactions, filterType, search, sortOrder]);

  async function deleteTransaction(id: string) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    const res = await fetch(`/api/me/transactions/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Transaction deleted successfully!");
      fetchTransactions();
    } else {
      toast.error("Error deleting transaction.");
    }
  }

  return (
    <div className="p-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-zinc-800">Transactions</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search description or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
          />
          <Select
            value={filterType}
            onValueChange={(v) =>
              setFilterType(v as "INCOME" | "EXPENSE" | "ALL")
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(v) =>
              setSortOrder(v as "NEWEST" | "OLDEST" | "HIGHEST" | "LOWEST")
            }
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEWEST">Newest</SelectItem>
              <SelectItem value="OLDEST">Oldest</SelectItem>
              <SelectItem value="HIGHEST">Highest amount</SelectItem>
              <SelectItem value="LOWEST">Lowest amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-zinc-500">
          <Loader2 className="animate-spin mr-2" /> Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-zinc-500 mt-12">
          No transactions found.
        </div>
      ) : (
        <div className="bg-white/50 border border-white p-4 rounded-lg">
          <div className="flex flex-wrap gap-4">
            {filtered.map((tx) => (
              <Card
                key={tx.id}
                className="w-full shadow-none bg-white/50 border border-white relative contain-content transition cursor-pointer hover:opacity-80"
                onClick={() => {
                  setEditTx(tx);
                  const params = new URLSearchParams(window.location.search);
                  params.set("tx", tx.id);
                  router.replace(`?${params.toString()}`, { scroll: false });
                }}
              >
                <Image
                  src={
                    getBank(tx.bankAccountId as string)?.icon ||
                    "/banks/generic.svg"
                  }
                  className="absolute right-0 top-0 opacity-10 contrast-0"
                  alt="Bank Logo"
                  height={256}
                  width={256}
                />
                <CardHeader className="flex flex-row justify-between items-center pb-2">
                  <CardTitle className="truncate text-lg font-semibold">
                    {tx.description}
                  </CardTitle>
                  <div className="flex rounded-lg bg-white/50 border border-white backdrop-blur-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => {
                        setEditTx(tx);
                        const params = new URLSearchParams(
                          window.location.search,
                        );
                        params.set("tx", tx.id);
                        router.replace(`?${params.toString()}`, {
                          scroll: false,
                        });
                      }}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTransaction(tx.id);
                      }}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    {tx.type === "INCOME" ? (
                      <ArrowUpCircle className="text-green-500" size={18} />
                    ) : (
                      <ArrowDownCircle className="text-red-500" size={18} />
                    )}
                    {tx.type === "INCOME" ? (
                      <span className="text-green-600 text-lg">
                        + $
                        {Number(tx.amount).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    ) : (
                      <span className="text-red-600 text-lg">
                        - $
                        {Number(tx.amount).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">
                    {new Date(tx.date).toString()}
                  </p>

                  {tx.tags && tx.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tx.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-white border-zinc-300 text-zinc-800 flex items-center gap-1"
                        >
                          <Tag size={12} /> {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <TransactionEditDrawer
        transaction={editTx as Transaction}
        open={!!editTx}
        onClose={() => {
          setEditTx(null);
          const params = new URLSearchParams(window.location.search);
          params.delete("tx");
          router.replace(`?${params.toString()}`, { scroll: false });
        }}
        onSaved={fetchTransactions}
      />
    </div>
  );
}
