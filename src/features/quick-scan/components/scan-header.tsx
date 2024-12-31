"use client";
import { useBillStore } from "@/features/bills/store/use-bill-store";
import { useRouter } from "next/navigation";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "../../../components/ui/button";
import { useAiScan } from "../hooks/use-scanner";

export function ScanHeader({
	files,
}: { files: ClientUploadedFileData<{ uploadedBy: string }>[] }) {
	const { mutate: handleScan, isPending } = useAiScan();
	const { setScannedBill } = useBillStore();
	const router = useRouter();

	return (
		<>
			<p className="font-bold text-xl tracking-tight">Upload your bill</p>
			{/* <Link
				href={{
					pathname: "/new-bill",
					query: `i=${files[0].url}`,
				}}
			> */}
			<Button
				variant={"default"}
				disabled={files.length === 0 || isPending}
				onClick={() =>
					handleScan(
						{ billImageUrl: files[0].url },
						{
							onSuccess: (data) => {
								setScannedBill(data);
								router.push("/new-bill");
							},
						},
					)
				}
			>
				{isPending ? "Scanning..." : "Proceed"}
			</Button>
			{/* </Link> */}
		</>
	);
}
