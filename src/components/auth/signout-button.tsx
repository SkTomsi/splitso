"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut({
					redirectTo: "/",
				});
			}}
		>
			<button type="submit">Logout</button>
		</form>
	);
}
