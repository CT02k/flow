-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
