"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function BackButton() {
	const router = useRouter();

	const path = usePathname();

	if (path === "/home") {
		return null;
	}

	return (
		<Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
			<ArrowLeft />
		</Button>
	);
}
