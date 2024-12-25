"use client";

import { Button } from "@/components/ui/button";
import { useInviteJoin } from "../hooks/join-invite";
import { ArrowRight } from "lucide-react";

export default function JoinButton({ code }: { code: string }) {
	const { mutate: joinInvite } = useInviteJoin();

	return (
		<Button className="mt-4 h-12 w-full" onClick={() => joinInvite(code)}>
			Get Started
			<ArrowRight className="ml-1 h-8 w-8" />
		</Button>
	);
}
