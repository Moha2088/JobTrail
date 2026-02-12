ALTER TABLE "users" DROP CONSTRAINT "users_ApplicationId_applications_Id_fk";
--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "UserId" integer;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_UserId_users_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."users"("Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "ApplicationId";