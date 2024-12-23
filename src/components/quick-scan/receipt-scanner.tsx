"use client";

import { useState } from "react";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Card } from "../ui/card";
import { BillUploadCard } from "./bill-upload";
import { ScanHeader } from "./scan-header";

export function ReceiptScanner() {
	const [files, setFiles] = useState<
		ClientUploadedFileData<{ uploadedBy: string }>[]
	>([]);

	return (
		<>
			<div className="flex items-center justify-between">
				<ScanHeader files={files} />
			</div>
			<Card className="flex h-fit w-full flex-col items-center justify-center gap-6 p-6 shadow-none">
				<BillUploadCard files={files} setFiles={setFiles} />
			</Card>
		</>
	);
}
