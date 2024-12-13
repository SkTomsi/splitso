import { pgTable, unique } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	(t) => ({
		id: t
			.text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID())
			.notNull(),
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
