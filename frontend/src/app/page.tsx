"use client"

import HomeFeature from "@/components/home/Home";
import {useAccount} from "wagmi"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
    <HomeFeature/>
  </main>
  );
}
