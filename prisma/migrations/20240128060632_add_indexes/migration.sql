-- CreateIndex
CREATE INDEX "Token_owner_id_idx" ON "Token"("owner_id");

-- CreateIndex
CREATE INDEX "Token_tokenID_idx" ON "Token"("tokenID");

-- CreateIndex
CREATE INDEX "TokenTrait_tokenID_idx" ON "TokenTrait"("tokenID");

-- CreateIndex
CREATE INDEX "TokenTrait_traitType_value_idx" ON "TokenTrait"("traitType", "value");
