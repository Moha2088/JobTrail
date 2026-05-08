ALTER TABLE "applications" DROP CONSTRAINT "applications_UserId_users_Id_fk";
--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "Email" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "PendingDeletion" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_UserId_users_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."users"("Id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint