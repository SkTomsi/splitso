import Header from "@/features/home/header";
import InviteBadge from "@/features/home/invite-badge";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex h-full w-full flex-col ">
			<InviteBadge />
			<Header />
			<div className="h-[calc(100vh-64px)] w-full px-2">{children}</div>
		</div>
	);
}
