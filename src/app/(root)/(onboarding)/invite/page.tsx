import { IMAGES } from "@/assets";
import { Card } from "@/components/ui/card";
import InviteButton from "@/features/invite/components/invite-button";
import Image from "next/image";

export default function InvitePage() {
	return (
		<div className="flex h-full w-full flex-col items-center px-4 py-8">
			<Card className="flex h-full w-full flex-col justify-between gap-4 border-none shadow-none">
				<Image
					src={IMAGES.inviteBanner}
					alt="Invite Banner"
					className="w-full rounded-3xl object-contain"
				/>
				<div className="my-2 flex flex-col items-center gap-2">
					<p className="font-bold text-2xl tracking-tighter">
						Find and invite people you know!
					</p>
					<p className="text-center text-muted-foreground text-sm">
						invite your friends to join and try out splitfa.st to split your
						next party bills!
					</p>
				</div>
				<InviteButton />
			</Card>
		</div>
	);
}
