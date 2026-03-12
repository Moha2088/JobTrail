ALTER TABLE "applications" ADD COLUMN "CreatedAt" timestamp DEFAULT now();--> statement-breakpoint
CREATE INDEX "CreatedAt_idx" ON "applications" USING btree ("CreatedAt");