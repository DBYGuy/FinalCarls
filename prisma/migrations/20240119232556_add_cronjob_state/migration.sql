-- CreateTable
CREATE TABLE "CronJobState" (
    "id" SERIAL NOT NULL,
    "lastTokenId" INTEGER NOT NULL DEFAULT 0,
    "lastImageTokenId" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CronJobState_pkey" PRIMARY KEY ("id")
);
