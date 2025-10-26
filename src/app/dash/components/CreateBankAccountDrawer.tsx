"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onCreated?: () => void;
}

const colorOptions = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
];

export default function BankAccountCreateDrawer({
  open,
  setOpen,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setName("");
    setColor("#3B82F6");
  };

  useEffect(() => {
    if (!open) resetState();
  }, [open]);

  const handleCreateAccount = async () => {
    if (!name.trim()) {
      toast.warning("Please enter a name for your bank account.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/me/bank-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          color,
          icon: "/banks/generic.svg",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create bank account.");
      }

      toast.success("Bank account created successfully!");
      setOpen(false);
      resetState();
      onCreated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle className="text-3xl font-semibold text-black">
            Create Bank Account
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Account name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/50 border border-white"
          />

          <div>
            <p className="text-sm text-zinc-500 mb-2">Select color</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition ${
                    color === c
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <Button
            disabled={loading}
            onClick={handleCreateAccount}
            className="mt-6 bg-white/80 border border-white text-black hover:opacity-70 hover:bg-white cursor-pointer"
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
