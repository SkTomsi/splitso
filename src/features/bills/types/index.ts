export interface Bill {
	restaurantName: string;
	billTotal: number;
	gstTotal: number;
	date: string;
	address: string;
	items: BillItem[];
}

export interface BillItem {
	amount: number;
	quantity: number;
	name: string;
	itemTotal: number;
}
