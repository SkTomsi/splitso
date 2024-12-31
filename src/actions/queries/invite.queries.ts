import { db } from "@/server/db";
import { friends, invites } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserInvites(userId: string) {
	return await db.query.invites.findFirst({
		where: (t, { eq }) => eq(t.userId, userId),
	});
}

export async function createUserInvite(userId: string, code: string) {
	return await db.insert(invites).values({
		code,
		userId,
	});
}

export async function createNewFren(friendId: string, userId: string) {
	return await db.insert(friends).values({
		friendId: friendId,
		userId: userId,
	});
}

export async function getInviteByCode(code: string) {
	return await db
		.select()
		.from(invites)
		.where((invites) => eq(invites.code, code));
}
