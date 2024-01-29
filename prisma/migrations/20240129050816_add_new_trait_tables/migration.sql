-- CreateTable
CREATE TABLE "TraitType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TraitType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraitValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "traitTypeId" INTEGER NOT NULL,

    CONSTRAINT "TraitValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TraitType_name_key" ON "TraitType"("name");

-- AddForeignKey
ALTER TABLE "TraitValue" ADD CONSTRAINT "TraitValue_traitTypeId_fkey" FOREIGN KEY ("traitTypeId") REFERENCES "TraitType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
