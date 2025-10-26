"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@prisma/client";
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
import { toast } from "sonner";

export interface BankAccount {
  id: string;
  name: string;
  color?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  transaction: Transaction;
}

export default function TransactionEditDrawer({
  open,
  onClose,
  onSaved,
  transaction,
}: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [bankAccountId, setBankAccountId] = useState<string | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/me/bank-accounts");
      const data = await res.json();
      setAccounts(data);
    }
    loadAccounts();
  }, []);

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description ?? "");
      setAmount(String(transaction.amount));
      setTags(transaction.tags || []);
      setBankAccountId(transaction.bankAccountId ?? undefined);
    }
  }, [transaction]);

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.length >= 3) {
      toast.warning("You can only add up to 3 tags.");
      return;
    }
    if (tags.includes(tagInput.trim())) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/me/transactions/${transaction.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          bankAccountId,
          tags,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update transaction.");
      }

      toast.success("Transaction updated successfully!");
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle className="text-3xl font-semibold text-black">
            Edit Transaction
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/50 border border-white"
          />

          <div className="flex gap-4">
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
          </div>

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
                className="bg-white/50 border border-white"
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
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
