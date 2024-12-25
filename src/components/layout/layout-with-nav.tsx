import Header from "@/features/home/header";

export default function LayoutWithNav({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
