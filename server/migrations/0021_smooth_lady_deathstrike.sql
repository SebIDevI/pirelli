ALTER TABLE "orders" RENAME COLUMN "userId" TO "userID";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "recieptURL" TO "receiptURL";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
