CREATE TABLE "applications" (
	"Id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applications_Id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"CompanyName" varchar(30) NOT NULL,
	"Email" varchar(30) NOT NULL,
	"ApplicationStatus" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"Id" integer PRIMARY KEY NOT NULL,
	"Name" varchar(30) NOT NULL,
	"Email" varchar(30) NOT NULL,
	"Password" varchar(100) NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	"ApplicationId" integer,
	CONSTRAINT "users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_ApplicationId_applications_Id_fk" FOREIGN KEY ("ApplicationId") REFERENCES "public"."applications"("Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "CompanyName_idx" ON "applications" USING btree ("CompanyName");--> statement-breakpoint
CREATE INDEX "Email_idx" ON "applications" USING btree ("Email");--> statement-breakpoint
CREATE INDEX "Status_idx" ON "applications" USING btree ("ApplicationStatus");