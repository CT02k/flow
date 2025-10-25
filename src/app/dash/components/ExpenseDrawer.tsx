"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function ExpenseDrawer({ open, setOpen }: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExpense = () => {
    console.log({ amount, description });
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-semibold">
            Add Expense
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Description"
            value={description}
            className="bg-white/50 border border-white pt-5 pb-12"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Value ($)"
            type="number"
            value={amount}
            className="bg-white/50 border border-white"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            className="mt-4 bg-white/80 border border-white text-black hover:opacity-70 hover:bg-white cursor-pointer"
            onClick={handleAddExpense}
          >
            Create
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
