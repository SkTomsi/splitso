"use client";

import { BillUploadCard } from "@/features/quick-scan/components/bill-upload";
import { ScanHeader } from "@/features/quick-scan/components/scan-header";
import { useState } from "react";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Card } from "../../../components/ui/card";

export function ReceiptScanner() {
	const [files, setFiles] = useState<
		ClientUploadedFileData<{ uploadedBy: string }>[]
	>([]);

	return (
		<div className="mb-6 flex h-full w-full flex-col gap-6 p-6 shadow-none">
			<div className="flex items-center justify-between">
				<ScanHeader files={files} />
			</div>
			<Card className="flex h-fit w-full flex-col items-center justify-center gap-6 p-6 shadow-none">
				<BillUploadCard files={files} setFiles={setFiles} />
			</Card>
		</div>
	);
}
