"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { friends, invites } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const INVITE_CODE_LENGTH = 6;

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function generateInviteCode() {
	return crypto.randomUUID().slice(0, INVITE_CODE_LENGTH);
}

export async function getInviteCode() {
	const session = await auth();

	if (!session?.user) {
		throw new Error("User not logged in");
	}

	const userId = session.user.id;

	if (!userId) {
		throw new Error("userId is required");
	}

	const invite = await db.query.invites.findFirst({
		where: (t, { eq }) => eq(t.userId, userId),
	});

	if (!invite) {
		return { message: "No invite found", status: false };
	}

	return { message: "Invite found", status: true, data: invite };
}

export async function GenerateInviteLinkAction() {
	const session = await auth();

	if (!session?.user) {
		throw new Error("User not logged in");
	}

	const existingInvite = await db.query.invites.findFirst({
		where: (t, { eq }) => eq(t.userId, session.user.id),
	});

	if (existingInvite) {
		return { message: "Invite already generated", status: false };
	}

	const code = await generateInviteCode();

	try {
		await db.insert(invites).values({
			code,
			userId: session.user.id,
		});

		return {
			message: "Invite generated",
			status: true,
		};
	} catch (error) {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(error);
		throw new Error("Something went wrong");
	}
}

export async function InviteJoinAction(code: string) {
	const session = await auth();

	if (!session?.user) {
		throw new Error("User not logged in");
	}

	try {
		const [invite] = await db
			.select()
			.from(invites)
			.where((invites) => eq(invites.code, code));

		if (!invite) {
			return { message: "Invite not found", status: false };
		}

		const userId = session.user.id;

		if (!userId) {
			throw new Error("userId is required");
		}

		await db.insert(friends).values({
			friendId: userId,
			userId: invite.userId,
		});

		return { message: "Invite joined", status: true };
	} catch (error) {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(error);
	}
}
