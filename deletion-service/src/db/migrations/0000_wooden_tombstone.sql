CREATE TABLE "users" (
	"Id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_Id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Name" varchar(30) NOT NULL,
	"Email" varchar(30) NOT NULL,
	"Password" varchar NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	"PendingDeletion" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_Email_unique" UNIQUE("Email")
);
