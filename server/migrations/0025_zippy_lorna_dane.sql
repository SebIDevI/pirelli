ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_prodcutVariantID_productVariants_id_fk";
--> statement-breakpoint
ALTER TABLE "orderProduct" ALTER COLUMN "orderID" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orderProduct" ALTER COLUMN "productID" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "productVariants" ALTER COLUMN "productID" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "variantImages" ALTER COLUMN "variantID" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "variantTags" ALTER COLUMN "variantID" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orderProduct" ADD COLUMN "productVariantID" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productVariantID_productVariants_id_fk" FOREIGN KEY ("productVariantID") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orderProduct" DROP COLUMN IF EXISTS "prodcutVariantID";