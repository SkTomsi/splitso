import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	(t) => ({
		id: t
			.text()
			.primaryKey()
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		name: t.text(),
		username: t.text().notNull(),
		email: t.text().notNull(),
		emailVerified: t.boolean().notNull().default(false),
		password: t.text(),
		image: t.text(),
		googleId: t.text(),
		oauthProvider: t.text(),
	}),
	(t) => ({
		uniqueUsername: unique().on(t.username),
		uniqueEmail: unique().on(t.email),
	}),
);

export const invites = pgTable("invites", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID())
		.notNull(),
	userId: text()
		.notNull()
		.references(() => users.id),
	code: text().notNull().unique(),
	createdAt: timestamp().defaultNow().notNull(),
});

export const friends = pgTable(
	"friends",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID())
			.notNull(),
		userId: text()
			.notNull()
			.references(() => users.id),
		friendId: text()
			.notNull()
			.references(() => users.id),
	},
	(t) => ({
		uniqueUserFriend: unique("unique_user_friend").on(t.userId, t.friendId),
	}),
);
