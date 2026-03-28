ALTER TABLE "applications" ALTER COLUMN "Content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "Key" varchar(100);