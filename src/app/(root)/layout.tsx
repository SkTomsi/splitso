import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative h-full w-full px-2">
			<Header />
			<div className="h-[calc(100vh-10vh)] w-full">{children}</div>
		</div>
	);
}
