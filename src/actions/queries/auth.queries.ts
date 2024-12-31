"use server";

import type { SignUpSchema } from "@/lib/zod/auth.validator";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import type { z } from "zod";

export const findUserByEmail = async (email: string) => {
	return await db.query.users.findFirst({
		where: (t, { eq }) => eq(t.email, email),
	});
};

export async function findUserByUsername(username: string) {
	return await db.query.users.findFirst({
		where: (t, { eq }) => eq(t.username, username),
	});
}

export async function createUser(
	data: z.infer<typeof SignUpSchema>,
	hashedPwd: string,
) {
	return await db.insert(users).values({
		username: data.username,
		email: data.email,
		password: hashedPwd,
	});
}
