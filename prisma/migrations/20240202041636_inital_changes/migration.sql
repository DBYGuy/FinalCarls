/*
  Warnings:

  - You are about to drop the column `level` on the `UserPoints` table. All the data in the column will be lost.
  - You are about to drop the `DailyReward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Referral` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenTrait` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TraitType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TraitValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDailyReward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "TokenTrait" DROP CONSTRAINT "TokenTrait_tokenID_fkey";

-- DropForeignKey
ALTER TABLE "TraitValue" DROP CONSTRAINT "TraitValue_traitTypeId_fkey";

-- DropForeignKey
ALTER TABLE "UserDailyReward" DROP CONSTRAINT "UserDailyReward_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMission" DROP CONSTRAINT "UserMission_mission_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMission" DROP CONSTRAINT "UserMission_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_user_id_fkey";

-- AlterTable
ALTER TABLE "UserPoints" DROP COLUMN "level";

-- DropTable
DROP TABLE "DailyReward";

-- DropTable
DROP TABLE "Level";

-- DropTable
DROP TABLE "Mission";

-- DropTable
DROP TABLE "Referral";

-- DropTable
DROP TABLE "Token";

-- DropTable
DROP TABLE "TokenTrait";

-- DropTable
DROP TABLE "TraitType";

-- DropTable
DROP TABLE "TraitValue";

-- DropTable
DROP TABLE "UserDailyReward";

-- DropTable
DROP TABLE "UserMission";

-- DropTable
DROP TABLE "UserProfile";
