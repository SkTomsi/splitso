"use client";

import { ScanReceiptAction } from "@/actions/scan.actions";
import type { Bill } from "@/features/bills/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAiScan() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["scan-bill"],
		mutationFn: async ({
			billImageUrl,
		}: {
			billImageUrl: string;
		}): Promise<Bill | null> => {
			try {
				const result = await ScanReceiptAction(billImageUrl);

				return result;
			} catch (error) {
				// biome-ignore lint/suspicious/noConsoleLog: <explanation>
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
		onError: ({ message }) => {
			toast.error(message ? message : "Something went wrong");
		},
		onSuccess: async (data) => {
			toast.success("Bill scanned successfully");
			await queryClient.setQueryData(["bill-scan", 1], data);
		},
	});
}
