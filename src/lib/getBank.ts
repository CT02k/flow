import { BankAccount } from "@prisma/client";

export const useBank = (accounts: BankAccount[]) => {
  const getBank = (bankId: string) => accounts.find((v) => v.id === bankId);
  return { getBank };
};
