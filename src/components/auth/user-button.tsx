import { SignOutAction } from "@/actions/auth.actions";
import { auth } from "@/server/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserButtonProps {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

export async function UserButton({ email, image }: UserButtonProps) {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div className="overflow-hidden rounded-full">
						<Image
							src={image ?? `https://avatar.vercel.sh/${session.user.name}`}
							alt="Profile"
							width={32}
							height={32}
						/>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{email}</DropdownMenuLabel>
					<DropdownMenuItem className="cursor-pointer" onClick={SignOutAction}>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
