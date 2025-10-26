/*
  Warnings:

  - Made the column `icon` on table `BankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `BankAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."BankAccount" ALTER COLUMN "icon" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;
