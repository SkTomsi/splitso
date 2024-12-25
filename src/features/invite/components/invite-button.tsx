"use client";

import { Button } from "@/components/ui/button";
import { Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetCode } from "../hooks/get-invite-code";
import GenerateInviteButton from "./generate-invite-button";

export default function InviteButton() {
	const { data, isPending } = useGetCode();

	if (data?.code) {
		return (
			<Button
				onClick={() =>
					navigator.clipboard
						.writeText(`http://localhost:3000/join/${data.code}`)
						.then(() => {
							toast.success("Invite link copied to clipboard!");
						})
				}
			>
				<Link2 className="mr-1 h-8 w-8" />
				Share an invite Link
			</Button>
		);
	}

	if (isPending) {
		return (
			<Button disabled>
				<Loader2 className="mr-1 h-8 w-8 animate-spin" />
				Checking for invite link...
			</Button>
		);
	}

	return <GenerateInviteButton />;
}
