ALTER TABLE "orderProduct" ADD COLUMN "userID" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
