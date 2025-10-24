-- CreateTable
CREATE TABLE "public"."UserFinanceStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "monthlyIncome" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "monthlyExpense" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFinanceStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFinanceStats_userId_key" ON "public"."UserFinanceStats"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserFinanceStats" ADD CONSTRAINT "UserFinanceStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
