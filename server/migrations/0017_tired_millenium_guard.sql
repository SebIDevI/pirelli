ALTER TABLE "productVariants" ADD COLUMN "price" real NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "pirelliId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "ean" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "eprellLink" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "fullSize" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "lssc" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "rr" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "wg" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "prestige" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "protectieRIM" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "size" text NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" DROP COLUMN IF EXISTS "color";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "pirelliId";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "ean";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "eprellLink";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "fullSize";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "lssc";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "rr";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "wg";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "prestige";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "protectieRIM";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "size";