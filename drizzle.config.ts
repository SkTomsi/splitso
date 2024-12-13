import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
	schema: "./src/server/db/schema.ts",
	out: "./drizzle/migrations",
	dialect: "postgresql",
	verbose: true,
	strict: true,
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});
