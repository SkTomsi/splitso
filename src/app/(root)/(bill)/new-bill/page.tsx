"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import NewBillDetails from "@/features/bills/components/new-bill-details";
import { useBillStore } from "@/features/bills/store/use-bill-store";
import { Suspense } from "react";

function NewBill() {
	const { scannedBill } = useBillStore();

	console.log(scannedBill);
	console.log("HELLOOO FROM NEW BILLLL");

	const loading = scannedBill?.loading;
	const data = scannedBill?.data;

	return (
		<div className="flex h-full w-full flex-col gap-2 bg-zinc-50 px-4 py-2">
			<h1 className="py-2 font-bold text-xl tracking-tight">New Bill</h1>
			{loading && <NewBillSkeleton />}
			{!loading && <NewBillDetails bill={data} />}
		</div>
	);
}

function NewBillSkeleton() {
	return (
		<>
			<Card className="flex h-fit w-full flex-col items-center justify-center gap-6 p-6 shadow-none">
				<div className="flex w-full flex-col items-center gap-2">
					<Skeleton className="h-4 w-44" />
					<Skeleton className="h-4 w-20" />
				</div>
				<div className="flex h-full w-full flex-col divide-y">
					<div className="flex w-full items-center justify-between gap-6 py-4">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
					</div>
					<div className="flex w-full items-center justify-between gap-6 py-4">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
					</div>
					<div className="flex w-full items-center justify-between gap-6 py-4">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
					</div>
				</div>
			</Card>
			<Card className="flex h-fit w-full flex-col items-center justify-center gap-6 p-6 shadow-none">
				<div className="flex h-full w-full flex-col divide-y">
					<div className="flex w-full items-center justify-between gap-6 py-4">
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
					</div>
					<div className="flex w-full items-center justify-between gap-6 py-4">
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
					</div>
					<div className="flex w-full items-center justify-between gap-6 py-4">
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
					</div>
				</div>
			</Card>
		</>
	);
}

export default function NewBillPage() {
	return (
		<Suspense>
			<NewBill />
		</Suspense>
	);
}
