ALTER TABLE "products" ALTER COLUMN "ean" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "lssc" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "oe";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "speedIndex";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "tech";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "phaseIn";