"use client";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "../../../components/ui/button";
import { useScanner } from "../hooks/use-scanner";

export function ScanHeader({
	files,
}: { files: ClientUploadedFileData<{ uploadedBy: string }>[] }) {
	const { mutate: handleProceed, isPending } = useScanner();

	return (
		<>
			<p className="font-bold text-xl tracking-tight">Upload your bill</p>
			<Button variant={"default"} onClick={() => handleProceed({ files })}>
				{isPending ? "Loading..." : "Proceed"}
			</Button>
		</>
	);
}
