import { ReceiptScanner } from "@/features/quick-scan/components/receipt-scanner";

export default function Page() {
	return (
		<div className="flex h-full flex-col gap-6">
			<ReceiptScanner />
		</div>
	);
}
