import { Card } from "@/components/ui/card";
import type { Bill } from "../types";

interface Props {
	bill?: Bill | null;
}

export default function NewBillDetails({ bill }: Props) {
	return (
		<div>
			<Card className="flex h-fit w-full flex-col items-center justify-center gap-6 p-6 shadow-none">
				{bill?.items.map((item) => (
					<div key={item.name}>
						<p>{item.name}</p>
						<p>{item.amount}</p>
						<p>{item.quantity}</p>
						<p>{item.itemTotal}</p>
					</div>
				))}
			</Card>
		</div>
	);
}
