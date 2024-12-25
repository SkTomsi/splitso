"use client";

import { BadgeInfo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InviteBadge() {
	const path = usePathname();

	if (path !== "/home") {
		return null;
	}

	return (
		<Link href={"/invite"}>
			<div className="flex h-fit w-full items-center justify-center gap-1 bg-primary p-2 font-medium text-sm text-white">
				<BadgeInfo className="mr-2 h-6 w-6" />
				<p className="w-full">
					splitfa.st is currently in dev, invite your friends to join and try it
					out!
				</p>
			</div>
		</Link>
	);
}
