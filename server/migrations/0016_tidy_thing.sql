ALTER TABLE "products" ALTER COLUMN "protectieRIM" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "family";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "season";