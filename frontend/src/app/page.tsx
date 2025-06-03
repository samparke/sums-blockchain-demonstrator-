"use client"

import WholeBlockchainDemo from "@/components/home/WholeBlockchainDemo";
import {useAccount} from "wagmi"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
    <WholeBlockchainDemo/>
  </main>
  );
}
