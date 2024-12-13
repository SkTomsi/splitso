import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/server/auth/auth";
import { ReceiptText, ScanLine } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<div className="mt-8 flex w-full flex-col items-center gap-10 px-4">
			<h1 className="w-full text-left font-semibold text-3xl tracking-tighter">{`Hello, ${session.user.name ?? "Guest"}`}</h1>
			{/* <div className="w-full overflow-hidden">{JSON.stringify(session)}</div> */}
			<div className="w-full">
				<Card className="flex w-full flex-col items-center gap-4 rounded-3xl border border-zinc-200/80 py-8 shadow-[0px_10px_20px_0px_rgba(85,22,217,0.05)]">
					<h2 className="font-bold text-5xl tracking-tighter">₹ 0</h2>
					<p>You dont have any bills yet. Add one now!</p>
					<div className="mt-2 flex gap-4 px-2">
						<Link href={"/quick-scan"}>
							<Button
								className="w-full rounded-full font-light text-base"
								size={"lg"}
							>
								<ScanLine className="h-20 w-20" fontSize={24} />
								Quick Scan
							</Button>
						</Link>
						<Button
							className="w-full rounded-full font-light text-base"
							size={"lg"}
							variant={"black"}
						>
							<ReceiptText />
							Add Manually
						</Button>
					</div>
				</Card>
				<Card className="flex w-full flex-col items-center gap-4 rounded-3xl border border-zinc-200/80 py-8 shadow-[0px_10px_20px_0px_rgba(85,22,217,0.05)]" />
			</div>
		</div>
	);
}
