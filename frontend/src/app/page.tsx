"use client"

import { BlockchainSection } from "@/components/home/BlockchainSection";
import { BlockSection } from "@/components/home/BlockSection";
import { HashSection } from "@/components/home/HashSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import WholeBlockchainDemo from "@/components/home/WholeBlockchainDemo";
import {useAccount} from "wagmi"

export default function Home() {
  return (
    <main className="min-h-screen">
    <HomeHeroSection/>
    <WholeBlockchainDemo/>
  </main>
  );
}
