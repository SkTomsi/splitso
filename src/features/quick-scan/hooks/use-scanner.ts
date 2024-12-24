import { ScanReceiptAction } from "@/actions/scan.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ClientUploadedFileData } from "uploadthing/types";

export function useScanner() {
	return useMutation({
		mutationFn: async ({
			files,
		}: { files: ClientUploadedFileData<{ uploadedBy: string }>[] }) => {
			if (files?.length === 0) {
				throw Error("Uh oh! Looks like you forgot to upload a bill");
			}

			try {
				toast.info(
					"scanning your bill using our skibidi AI, please wait this might take 10-30s ....",
				);

				const result = await ScanReceiptAction(files);

				if (!result) {
					return { message: "Something went wrong", status: false };
				}

				return result;
			} catch (error) {
				// biome-ignore lint/suspicious/noConsoleLog: <explanation>
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
		onSuccess: () => {
			toast.success("Successfully scanned your bill, redirecting...");
		},
		onError: ({ message }) => {
			toast.error(message ? message : "Something went wrong");
		},
	});
}
