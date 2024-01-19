/*
  Warnings:

  - You are about to drop the column `traits` on the `Token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "traits";

-- CreateTable
CREATE TABLE "TokenTrait" (
    "id" SERIAL NOT NULL,
    "tokenID" INTEGER NOT NULL,
    "traitType" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "TokenTrait_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenTrait" ADD CONSTRAINT "TokenTrait_tokenID_fkey" FOREIGN KEY ("tokenID") REFERENCES "Token"("tokenID") ON DELETE RESTRICT ON UPDATE CASCADE;
