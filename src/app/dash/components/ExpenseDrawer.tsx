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
          <DrawerTitle className="text-lg font-semibold">
            Adicionar Despesa
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Valor ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            className="mt-4 bg-red-500 hover:bg-red-600"
            onClick={handleAddExpense}
          >
            Adicionar
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
