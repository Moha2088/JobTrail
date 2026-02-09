ALTER TABLE "users" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "users_Id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "Position" varchar(40) NOT NULL;--> statement-breakpoint
CREATE INDEX "Position_idx" ON "applications" USING btree ("Position");