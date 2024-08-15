CREATE TABLE IF NOT EXISTS "orderProduct" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"prodcutVariantID" serial NOT NULL,
	"productID" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"total" real NOT NULL,
	"status" text NOT NULL,
	"created" timestamp DEFAULT now(),
	"recieptURL" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_prodcutVariantID_productVariants_id_fk" FOREIGN KEY ("prodcutVariantID") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
