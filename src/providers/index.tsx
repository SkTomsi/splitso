"use client";

import { SessionProvider } from "next-auth/react";
import type React from "react";
import QueryProvider from "./query-client";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<QueryProvider>
				<SessionProvider>{children}</SessionProvider>
			</QueryProvider>
		</>
	);
}
