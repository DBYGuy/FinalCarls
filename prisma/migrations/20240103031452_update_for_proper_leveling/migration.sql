/*
  Warnings:

  - You are about to drop the column `currentPoints` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPoints" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "currentPoints",
DROP COLUMN "level";
