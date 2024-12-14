"use client";

import { Card } from "@/components/ui/card";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import type { ClientUploadedFileData } from "uploadthing/types";

export default function Page() {
	const [files, setFiles] = useState<
		ClientUploadedFileData<{ uploadedBy: string }>[]
	>([]);

	return (
		<div className="mt-20 flex h-full flex-col gap-10">
			<Card className="flex h-fit w-full flex-col items-center justify-center gap-6 p-6 shadow-none">
				<p className="font-bold text-xl tracking-tight">Upload your bill</p>
				<UploadButton
					endpoint="imageUploader"
					onClientUploadComplete={(res) => {
						// Do something with the response

						setFiles(res);
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						// biome-ignore lint/suspicious/noConsoleLog: <explanation>
						console.log(`ERROR! ${error.message}`);
					}}
				/>

				{files.length > 0 ? (
					<div className="flex flex-col gap-2">
						{files.map((file) => (
							<Image
								src={file.url}
								alt={file.name}
								key={file.fileHash}
								className="w-full object-contain"
								width={200}
								height={200}
								objectFit="cover"
							/>
						))}
					</div>
				) : (
					<div className="h-[200px] w-[200px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
				)}
			</Card>
		</div>
	);
}
