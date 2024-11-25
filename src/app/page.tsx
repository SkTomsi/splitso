import HeroImage from "@/app/heroImage.webp";
import WaitlistBox from "@/components/waitlist-box";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-between gap-10 pb-12 font-[family-name:var(--font-geist-sans)]">
			<Image
				src={HeroImage}
				alt="hero"
				className="h-[400px] object-cover object-bottom"
			/>
			<div className="flex flex-col gap-4 px-2">
				<h1 className="font-bold text-2xl tracking-tighter sm:text-4xl">
					No more IOU stress. Just fair, instant settlements.
				</h1>
				<p className="text-sm text-zinc-500 sm:text-lg">
					add your expense, tag who&apos;s involved, and let everyone know their
					share instantly.
				</p>
			</div>
			<WaitlistBox />
		</div>
	);
}
