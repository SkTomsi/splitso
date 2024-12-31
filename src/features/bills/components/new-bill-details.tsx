import { Card } from "@/components/ui/card";
import type { Bill, BillItem } from "../types";

interface Props {
	bill?: Bill | null;
}

function MenuItem({ item }: { item: BillItem }) {
	return (
		<div className="flex w-full items-center justify-between pt-4">
			<div className="flex w-full items-center gap-4">
				<p className="font-medium text-muted-foreground/60">{item.quantity}x</p>
				<p className="font-medium text-sm tracking-tight">{item.name}</p>
			</div>
			<div className="flex gap-2">
				<p className="font-bold text-sm">{item.amount}/-</p>
				{/* <p>{item.itemTotal}</p> */}
			</div>
		</div>
	);
}

export default function NewBillDetails({ bill }: Props) {
	return (
		<Card className="flex h-fit w-full flex-col items-center justify-center gap-8 p-6 shadow-none">
			<div className="flex w-full flex-col items-center justify-center ">
				<p className="font-bold text-sm tracking-tight">
					{bill?.restaurantName}
				</p>
				<p className="font-medium text-muted-foreground text-sm tracking-tight">
					{new Date(bill?.date ?? Date.now()).toDateString()}
				</p>
			</div>
			<div className="flex w-full flex-col gap-2 divide-y text-sm">
				{bill?.items.map((item) => (
					<MenuItem key={item.name} item={item} />
				))}
			</div>
			<div className="flex w-full flex-col items-center gap-2">
				<div className="flex w-full items-center justify-between text-sm">
					<p className="text-muted-foreground/60">Subtotal</p>
					<p className="text-muted-foreground text-sm">{bill?.billTotal}/-</p>
				</div>
				<div className="flex w-full items-center justify-between text-sm">
					<p className="text-muted-foreground/60">Tax</p>
					<p className="text-muted-foreground text-sm">{bill?.gstTotal}/-</p>
				</div>
				<div className="flex w-full items-center justify-between border-muted-foreground/20 border-t pt-2 text-sm">
					<p className="font-bold text-[14px] text-primary">Total Bill</p>
					<p className="font-bold text-sm">{bill?.billTotal}/-</p>
				</div>
			</div>
		</Card>
	);
}
