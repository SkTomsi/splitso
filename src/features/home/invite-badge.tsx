"use client";

import { BadgeInfo } from "lucide-react";
import { usePathname } from "next/navigation";

export default function InviteBadge() {
	const path = usePathname();

	if (path !== "/home") {
		return null;
	}

	return (
		<div className="flex h-fit w-full items-center justify-center bg-primary p-2 font-medium text-sm text-white ">
			<BadgeInfo className="mr-2 h-6 w-6" /> splitfa.st is currently in dev,
			invite your friends to join and try it out!
		</div>
	);
}
