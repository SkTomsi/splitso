import { Providers } from "@/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import type React from "react";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/NextTheme";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Splitfa.st | Coming Soon",
	description: "maybe the best way to split your bills with frens",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💸</text></svg>"
				/>
				<script src="https://getlaunchlist.com/js/widget.js" defer />
			</head>

			<body
				className={` ${geistSans.className} min-h-dvh min-w-screen antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					// enableSystem
				>
					<Providers>
						<div className="mx-auto flex h-dvh w-full max-w-[568px] flex-col">
							<main className="h-full">{children}</main>
							<Toaster richColors position="top-center" />
						</div>
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
