"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="px-8 py-4.5 border-b-[1px] border-zinc-200 flex flex-row justify-between items-center bg-zinc-100 xl:min-h-[77px]">
      <div className="flex items-center gap-2.5 md:gap-6">
        <a href="/" className="flex items-center gap-1 text-black">
          <Image
            src="/SUMS-logo.png"
            alt="Sheffield University Management School Logo"
            width={150}
            height={150}
          />
          <h1 className="font-bold text-black text-2xl px-3 hidden md:block">
           
          </h1>
        </a>
      </div>

    <div>
      <nav className="flex space-x-8">
          <Link href="/" className="text-black hover:text-blue-600">
            Home
          </Link>
          <Link href="/supply-chain" className="text-black hover:text-blue-600">
            Supply Chain
          </Link>
          <Link href="/identity" className="text-black hover:text-blue-600">
            Identity
          </Link>
          <Link href="/voting" className="text-black hover:text-blue-600">
            Voting
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <ConnectButton />
      </div>
    </nav>
  );
}
