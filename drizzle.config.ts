import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
