import { users } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const SignUpSchema = z.object({
	username: z.string().min(1, "Please enter your username"),
	email: z.string().min(1, "Please enter your email"),
	password: z
		.string()
		.min(8, "Please enter a password with at least 8 characters"),
});
export const LoginSchema = z.object({
	email: z.string().min(1, "Please enter your email"),
	password: z
		.string()
		.min(8, "Please enter a password with at least 8 characters"),
});

export const InsertUserSchema = createInsertSchema(users);
