import { auth } from "@/server/auth";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import { UserButton } from "../auth/user-button";

export default async function Header() {
	const session = await auth();

	const user = session?.user;

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex h-[10vh] w-full items-center justify-between">
			<h1 className="font-bold text-xl tracking-tighter">SplitFast</h1>
			<div className="flex items-center gap-4">
				<Bell className="h-6 w-6" />
				<UserButton email={user?.email} name={user?.name} image={user?.image} />
			</div>
		</div>
	);
}
