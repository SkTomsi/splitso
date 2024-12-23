"use client";
import { DeleteReceiptAction } from "@/actions/scan.actions";
import { UploadButton } from "@/utils/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import type { SetStateAction } from "react";
import { toast } from "sonner";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "../ui/button";

export function BillUploadCard({
	files,
	setFiles,
}: {
	files: ClientUploadedFileData<{ uploadedBy: string }>[];
	setFiles: React.Dispatch<
		SetStateAction<ClientUploadedFileData<{ uploadedBy: string }>[]>
	>;
}) {
	const { mutate: handleDelete, isPending } = useMutation({
		mutationFn: async () => {
			if (files?.length === 0) {
				return toast.error("Oh uh! Looks like you forgot to upload a bill");
			}

			try {
				toast.error("Deleting your bill, please wait...");

				const result = await DeleteReceiptAction({ fileKey: files[0].key });

				if (!result) {
					return toast.error("Something went wrong");
				}

				setFiles([]);

				toast.success(
					"Your bill has been deleted, please upload a new one to continue",
				);
			} catch (error) {
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
	});

	return (
		<>
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					// Do something with the response

					setFiles(res);
				}}
				onUploadError={(error: Error) => {
					// biome-ignore lint/suspicious/noConsoleLog: <explanation>
					console.log(`ERROR! ${error.message}`);
				}}
				className="ut-button:border ut-button:border-primary ut-button:bg-primary/40 ut-button:ut-readying:bg-red-500/50 ut-button:font-medium ut-button:text-purple-950"
			/>

			{files.length > 0 || isPending ? (
				<div className="relative flex flex-col gap-2">
					{files.map((file) => (
						<div className="relative " key={file.fileHash}>
							<Image
								src={file.url}
								alt={file.name}
								className="w-full rounded-2xl object-contain"
								width={200}
								height={200}
								objectFit="cover"
							/>
							<Button
								size={"icon"}
								className="absolute top-2 right-2 rounded-full bg-red-500/50 p-1 text-white transition-colors ease-out hover:bg-red-500"
								onClick={() => handleDelete()}
								disabled={isPending}
							>
								<Trash2 className="text-white group-hover:text-red-600" />
							</Button>
						</div>
					))}
				</div>
			) : (
				<div className="h-[200px] w-[200px] animate-pulse rounded-2xl bg-gray-200" />
			)}
		</>
	);
}
