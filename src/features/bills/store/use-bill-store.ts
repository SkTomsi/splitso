import type { Bill } from "../types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BillStore {
	scannedBill:
		| { data: Bill | null; loading: boolean }
		| { loading: true; data: null };
	setScannedBill: (scannedBill: Bill | null) => void;
}

export const useBillStore = create<BillStore>()(
	persist(
		(set) => ({
			scannedBill: { loading: true, data: null },
			setScannedBill: (scannedBill: Bill | null) =>
				set({ scannedBill: { data: scannedBill, loading: false } }),
		}),
		{
			name: "bill-store",
		},
	),
);
