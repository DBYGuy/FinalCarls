-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "ENSName" TEXT,
    "username" TEXT,
    "displayName" TEXT,
    "associatedEmail" TEXT,
    "Xhandle" TEXT,
    "discordID" TEXT,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completionBonus" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "platform" TEXT NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReward" (
    "day" INTEGER NOT NULL,
    "bonusAmount" INTEGER NOT NULL,

    CONSTRAINT "DailyReward_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "referralCode" INTEGER NOT NULL,
    "rewardAmount" INTEGER NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "tokenID" INTEGER NOT NULL,
    "traits" TEXT[],
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "lastTransaction" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("tokenID")
);

-- CreateTable
CREATE TABLE "UserPoints" (
    "user_id" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "totalPoints" INTEGER NOT NULL,

    CONSTRAINT "UserPoints_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserMission" (
    "user_id" TEXT NOT NULL,
    "mission_id" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "isComplete" BOOLEAN NOT NULL,

    CONSTRAINT "UserMission_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserDailyReward" (
    "user_id" TEXT NOT NULL,
    "currentDay" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserDailyReward_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "user_id" TEXT NOT NULL,
    "nickname" TEXT,
    "bio" TEXT,
    "walletAddress" TEXT NOT NULL,
    "location" TEXT,
    "level" INTEGER NOT NULL,
    "joinedDate" TIMESTAMP(3) NOT NULL,
    "currentPoints" INTEGER NOT NULL,
    "profile_image_url_https" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "level" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("level")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_ENSName_key" ON "User"("ENSName");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_associatedEmail_key" ON "User"("associatedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_Xhandle_key" ON "User"("Xhandle");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordID_key" ON "User"("discordID");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_walletAddress_key" ON "UserProfile"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Level_points_key" ON "Level"("points");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoints" ADD CONSTRAINT "UserPoints_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMission" ADD CONSTRAINT "UserMission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMission" ADD CONSTRAINT "UserMission_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDailyReward" ADD CONSTRAINT "UserDailyReward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
