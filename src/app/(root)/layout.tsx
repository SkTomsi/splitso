import LayoutWithNav from "@/components/layout/layout-with-nav";
import InviteBadge from "@/features/invite/components/invite-badge";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex h-full w-full flex-col ">
			<InviteBadge />
			<LayoutWithNav>
				<div className="h-[calc(100vh-64px)] w-full px-2">{children}</div>
			</LayoutWithNav>
		</div>
	);
}
