import { DeleteReceiptAction } from "@/actions/scan.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ClientUploadedFileData } from "uploadthing/types";

export function useDeleteBill() {
	return useMutation({
		mutationFn: async ({
			files,
		}: { files: ClientUploadedFileData<{ uploadedBy: string }>[] }) => {
			try {
				if (files?.length === 0) {
					return toast.error("Oh uh! Looks like you forgot to upload a bill");
				}

				const result = await DeleteReceiptAction({ fileKey: files[0].key });

				if (!result) {
					throw new Error("Error while deleting your bill");
				}

				return result;
			} catch (error) {
				// biome-ignore lint/suspicious/noConsoleLog: <explanation>
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
		onMutate: ({ files }) => {
			if (files?.length === 0) {
				return toast.error("Oh uh! Looks like you forgot to upload a bill");
			}

			toast.error("Deleting your bill, please wait...");
		},
		onError: ({ message }) => {
			toast.error(message ? message : "Something went wrong");
		},
	});
}
