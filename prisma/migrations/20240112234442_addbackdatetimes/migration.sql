/*
  Warnings:

  - You are about to drop the column `lastTransaction` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_owner_id_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "lastTransaction",
ADD COLUMN     "lastUpdated" TIMESTAMP(3),
ALTER COLUMN "owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
