import { Providers } from "@/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Splitfa.st",
  description: "maybe the best way to split your bills with frens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body
        className={` ${geistSans.className} min-w-screen min-h-screen antialiased`}
      >
        <div className="mx-auto flex h-full w-[568px] flex-col">
          <Providers>
            <main className="">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
