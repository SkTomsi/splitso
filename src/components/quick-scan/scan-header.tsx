"use client";
import { ScanReceiptAction } from "@/actions/scan.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "../ui/button";

export function ScanHeader({
	files,
}: { files: ClientUploadedFileData<{ uploadedBy: string }>[] }) {
	const { mutate: handleProceed, isPending } = useMutation({
		mutationFn: async () => {
			if (files?.length === 0) {
				return toast.error("Oh uh! Looks like you forgot to upload a bill");
			}

			try {
				toast.info(
					"scanning your bill using our skibidi AI, please wait this might take 10-30s ....",
				);

				const result = await ScanReceiptAction(files);

				console.log(result);

				if (!result) {
					return toast.error("Something went wrong");
				}

				toast.loading("Successfully scanned your bill, redirecting...");
			} catch (error) {
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
	});

	return (
		<>
			<p className="font-bold text-xl tracking-tight">Upload your bill</p>
			<Button variant={"default"} onClick={() => handleProceed()}>
				{isPending ? "Loading..." : "Proceed"}
			</Button>
		</>
	);
}
