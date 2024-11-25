import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-16 flex h-full w-full flex-col items-center justify-center gap-10 font-[family-name:var(--font-geist-sans)] sm:p-20 md:h-full">
      <div>
        <Image src={"/"} alt="" />

        <p>
          Just add your expense, tag who&apos;s involved, and let everyone know
          their share instantly.
        </p>
      </div>
    </div>
  );
}
