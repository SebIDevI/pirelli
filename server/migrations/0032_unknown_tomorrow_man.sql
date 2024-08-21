CREATE TABLE IF NOT EXISTS "productImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" real NOT NULL,
	"name" text NOT NULL,
	"order" real NOT NULL,
	"productID" serial NOT NULL
);
--> statement-breakpoint
DROP TABLE "variantImages";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
