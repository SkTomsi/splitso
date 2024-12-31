import { LoginSchema } from "@/lib/zod/auth.validator";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../db";
import { users } from "../db/schema";

export default {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
		Credentials({
			name: "credentials",
			id: "credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email" },
				password: { label: "password", type: "password" },
			},
			authorize: async (credentials) => {
				let user = null;

				const result = LoginSchema.safeParse(credentials);

				if (!result.success) {
					// biome-ignore lint/suspicious/noConsoleLog: <explanation>
					console.log("Invalid credentials");
					return null;
				}

				try {
					user = await db.query.users.findFirst({
						where: (t, { eq }) => eq(t.email, result.data.email),
					});
				} catch (_error) {
					// biome-ignore lint/suspicious/noConsoleLog: <explanation>
					console.log(_error);
					throw new Error("Something went wrong!");
				}

				if (!user?.password) {
					// if (user?.googleId) {
					//   return {
					//     message:
					//       "You have already used this email for google login, please use your google account to login",
					//     status: false,
					//   };
					// }

					return null;
				}

				// if (!user?.password ) {
				//   return null;
				// }

				const pwhash = await bcrypt.compare(
					result.data.password,
					user.password,
				);

				if (!pwhash) {
					return null;
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: "/signup",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === "google" && profile) {
				if (!(user.email && user.name)) {
					return false;
				}

				let email = profile.email;

				if (!email) {
					email = user.email;
				}

				const userExists = await db.query.users.findFirst({
					where: (t, { eq }) => eq(t.email, email),
				});

				if (!userExists) {
					await db.insert(users).values({
						emailVerified: true,
						email: user.email,
						username: user.name,
						password: null,
						name: user.name,
						image: user.image,
						googleId: profile.sub,
						oauthProvider: account.provider,
					});
				}
			}

			return true;
		},

		async jwt({ token, user }) {
			if (!user) {
				return token;
			}

			const loggedInUser = await db.query.users.findFirst({
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				where: (t, { eq }) => eq(t.email, user.email!),
			});

			if (!loggedInUser) {
				throw new Error("User not found");
			}

			token.id = loggedInUser.id;

			return token;
		},

		session({ session, token }) {
			if (token.id) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},
} satisfies NextAuthConfig;
