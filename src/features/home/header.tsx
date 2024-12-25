import BackButton from "@/components/layout/back-button";
import { auth } from "@/server/auth";
import { Bell } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "../../components/auth/user-button";

export default async function Header() {
	const session = await auth();

	const user = session?.user;

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex h-[64px] w-full items-center justify-between border-muted border-b px-2">
			<div className="flex items-center gap-6">
				<BackButton />

				<Link href={"/home"}>
					<h1 className="font-bold text-xl tracking-tighter">splitfa.st</h1>
				</Link>
			</div>
			<div className="flex items-center gap-4">
				<Bell className="h-6 w-6" />
				<UserButton email={user?.email} name={user?.name} image={user?.image} />
			</div>
		</div>
	);
}
