import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="bg-green-500/10 rounded-full size-250 absolute top-0 right-0 blur-[100px] animate-pulse"></div>
      <div className="bg-blue-500/10 rounded-full size-250 absolute bottom-0 left-0 blur-[100px] animate-pulse"></div>
      <div className="z-10 w-2/3 flex flex-col items-center mb-16">
        <Image
          src="/branding/logo_full_default_black.svg"
          alt="Logo"
          height={256}
          width={256}
        />
        <p className="text-center text-2xl mt-5">
          Flow is a personal finance management app built with Next.js, designed
          to help users manage income, expenses, and account balances through a
          clean and modern UI.
        </p>
        <div className="flex flex-col items-center gap-2 mt-5 mb-10">
          <Link
            href="/dash"
            className="bg-white/50 border border-white rounded-lg px-16 py-2 text-xl cursor-pointer transition hover:opacity-80"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/ct02k/flow"
            className="underline transition hover:opacity-80"
          >
            Our github
          </Link>
        </div>
      </div>

      <div className="p-3 bg-white/80 border rounded-lg border-white absolute -z-10 -bottom-20">
        <Image
          src="/hero.png"
          className="rounded-lg border border-white w-3xl h-auto"
          alt="Logo"
          height={1024}
          width={1024}
        />
      </div>
    </main>
  );
}
