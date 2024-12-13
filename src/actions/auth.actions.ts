"use server";

import { type LoginSchema, SignUpSchema } from "@/lib/zod/auth.validator";
import { signIn, signOut } from "@/server/auth/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import type { z } from "zod";

export const UserSignup = async (data: unknown) => {
	const result = await SignUpSchema.safeParseAsync(data);

	if (!result.success) {
		return { message: "Bad Request", status: false };
	}

	const userExists = await db.query.users.findFirst({
		where: (t, { eq }) => eq(t.email, result.data.email),
	});

	const hashedPwd = await bcrypt.hash(result.data.password, 10);
	if (userExists) {
		return { message: "User already exists with this email", status: false };
	}

	const usernameExists = await db.query.users.findFirst({
		where: (t, { eq }) => eq(t.username, result.data.username),
	});

	if (usernameExists) {
		return { message: "Username already exists", status: false };
	}

	try {
		await db.insert(users).values({
			username: result.data.username,
			email: result.data.email,
			password: hashedPwd,
		});

		return { message: "Account created successfully", status: true };
	} catch (_error) {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(_error);
		throw new Error("Something went wrong!");
	}
};

export const SignInAction = async () => {
	await signIn("google", {
		redirectTo: "/home",
	});
};
export const SignOutAction = async () => {
	await signOut({
		redirectTo: "/home",
	});
};

export const CredentialsAction = async (
	formData: z.infer<typeof LoginSchema>,
) => {
	try {
		await signIn("credentials", {
			...formData,
			redirectTo: "/home",
		});

		return { message: "Successfully Logged In", status: true };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return { message: "Invalid Credentials", status: false };
				}
				default: {
					return { message: "Something went wrong", status: false };
				}
			}
		}

		throw error;
	}
};
