"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";

type TransactionType = "INCOME" | "EXPENSE";

interface BankAccount {
  id: string;
  name: string;
  color?: string;
}

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  type: TransactionType;
}

export default function TransactionDrawer({ open, setOpen, type }: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [bankAccountId, setBankAccountId] = useState<string | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/bank-accounts");
      const data = await res.json();
      setAccounts(data);
    }
    loadAccounts();
  }, []);

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.length >= 3) {
      toast.warning("You can only add up to 3 tags.");
      return;
    }
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const isExpense = type === "EXPENSE";
  const title = isExpense ? "Create Expense" : "Create Income";
  const successMessage = isExpense
    ? "Expense recorded successfully!"
    : "Income created successfully!";

  const resetState = () => {
    setAmount("");
    setDescription("");
    setBankAccountId(undefined);
    setTags([]);
    setTagInput("");
  };

  const handleAddTransaction = async () => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          description,
          bankAccountId,
          type,
          tags,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Failed to create ${type.toLowerCase()}`,
        );
      }

      setOpen(false);
      resetState();
      toast.success(successMessage);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle className="text-3xl font-semibold text-black">
            {title}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/50 border border-white"
          />
          <Input
            placeholder="Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white/50 border border-white"
          />

          <Select value={bankAccountId} onValueChange={setBankAccountId}>
            <SelectTrigger className="bg-white/50 border border-white">
              <SelectValue placeholder="Select bank account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: acc.color || "#ccc" }}
                    />
                    {acc.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-black/10 px-3 py-1 rounded-full text-sm cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ✕
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <Button
                onClick={addTag}
                variant="outline"
                className="bg-white/80 border border-white"
              >
                Add
              </Button>
            </div>
          </div>

          <Button
            className="mt-6 bg-white/80 border border-white text-black hover:opacity-70 hover:bg-white cursor-pointer"
            onClick={handleAddTransaction}
          >
            Create
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
