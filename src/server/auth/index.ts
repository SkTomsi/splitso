import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			id: string;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"];
	}
}

export const { auth, handlers, signIn, signOut } = NextAuth({
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
	},
	jwt: {
		maxAge: 24 * 60 * 60,
	},
	...authConfig,
});
