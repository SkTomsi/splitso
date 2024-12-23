import { ReceiptScanner } from "@/components/quick-scan/receipt-scanner";

export default function Page() {
	return (
		<div className="mt-20 flex h-full flex-col gap-10">
			<ReceiptScanner />
		</div>
	);
}
