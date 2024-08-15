ALTER TABLE "products" ADD COLUMN "pirelliId" real NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "ean" real NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "eprellLink" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "oe" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "fullSize" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "family" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "speedIndex" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rr" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "wg" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "tech" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "phaseIn" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "prestige" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "protectieRIM" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "season" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "type" text NOT NULL;