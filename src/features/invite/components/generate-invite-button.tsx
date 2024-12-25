"use client";

import { Button } from "@/components/ui/button";
import { Link2, Loader2 } from "lucide-react";
import { useCreateInvite } from "../hooks/create-invite";

export default function GenerateInviteButton() {
	const { mutate: generateInviteLink, isPending } = useCreateInvite();

	return (
		<Button onClick={() => generateInviteLink()} disabled={isPending}>
			{isPending ? (
				<>
					<Loader2 className="mr-1 h-8 w-8 animate-spin" /> Generating...
				</>
			) : (
				<>
					<Link2 className="mr-1 h-8 w-8" />
					Generate an invite Link
				</>
			)}
		</Button>
	);
}
