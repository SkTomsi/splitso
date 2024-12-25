"use client";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import type { ClientUploadedFileData } from "uploadthing/types";
import { useDeleteBill } from "../hooks/use-delete-bill";

export function BillUploadCard({
	files,
	setFiles,
}: {
	files: ClientUploadedFileData<{ uploadedBy: string }>[];
	setFiles: Dispatch<
		SetStateAction<ClientUploadedFileData<{ uploadedBy: string }>[]>
	>;
}) {
	const { mutate: handleDelete, isPending } = useDeleteBill();

	return (
		<>
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					setFiles(res);
				}}
				onUploadError={(error: Error) => {
					// biome-ignore lint/suspicious/noConsoleLog: <explanation>
					console.log(`ERROR! ${error.message}`);
				}}
				className="ut-button:border ut-button:border-primary ut-button:bg-primary/40 ut-button:ut-readying:bg-red-500/50 ut-button:font-medium ut-button:text-purple-950"
			/>

			{files.length > 0 || isPending ? (
				<div className="relative flex flex-col gap-2 ">
					{files.map((file) => (
						<div className="relative h-full w-full" key={file.fileHash}>
							<Image
								src={file.url}
								alt={file.name}
								className="max-h-[390px] rounded-2xl object-contain"
								width={200}
								height={200}
							/>
							<Button
								size={"icon"}
								className="absolute top-2 right-2 rounded-full bg-red-500/50 p-1 text-white transition-colors ease-out hover:bg-red-500"
								onClick={() =>
									handleDelete(
										{ files },
										{
											onSuccess: () => {
												setFiles([]);
												toast.success(
													"Your bill has been deleted, please upload a new one to continue",
												);
											},
										},
									)
								}
								disabled={isPending}
							>
								<Trash2 className="text-white group-hover:text-red-600" />
							</Button>
						</div>
					))}
				</div>
			) : (
				<div className="h-[400px] w-full animate-pulse rounded-2xl bg-gray-200" />
			)}
		</>
	);
}
