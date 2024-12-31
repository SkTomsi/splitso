"use server";

import { type LoginSchema, SignUpSchema } from "@/lib/zod/auth.validator";
import { signIn, signOut } from "@/server/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import type { z } from "zod";
import {
	createUser,
	findUserByEmail,
	findUserByUsername,
} from "./queries/auth.queries";

export const UserSignup = async (data: unknown) => {
	const result = await SignUpSchema.safeParseAsync(data);

	if (!result.success) {
		return { message: "Bad Request", status: false };
	}

	const userExists = await findUserByEmail(result.data.email);

	const hashedPwd = await bcrypt.hash(result.data.password, 10);

	if (userExists) {
		return { message: "User already exists with this email", status: false };
	}

	const usernameExists = await findUserByUsername(result.data.username);

	if (usernameExists) {
		return { message: "Username already exists", status: false };
	}

	try {
		await createUser(result.data, hashedPwd);

		return { message: "Account created successfully", status: true };
	} catch (_error) {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(_error);
		throw new Error("Something went wrong!");
	}
};

export const SignInAction = async (code: string | null | undefined) => {
	await signIn("google", {
		redirectTo: code ? `/join/${code}` : "/home",
	});
};
export const SignOutAction = async () => {
	await signOut({
		redirectTo: "/login",
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
