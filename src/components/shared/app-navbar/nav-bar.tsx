"use client";

import { AuthButton } from "./auth-button";

export function AppNavbar() {
  return (
    <nav className="flex h-[10vh] items-center justify-between px-2 md:px-24">
      <div className="flex gap-x-2 font-bold tracking-tighter"></div>
      <AuthButton />
    </nav>
  );
}
