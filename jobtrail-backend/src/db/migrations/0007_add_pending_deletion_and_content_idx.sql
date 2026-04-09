ALTER TABLE "applications" ADD COLUMN "PendingDeletion" boolean DEFAULT false;--> statement-breakpoint
CREATE INDEX "Content_idx" ON "applications" USING btree ("Content");