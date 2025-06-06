"use client"

import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import WholeBlockchainDemo from "@/components/home/WholeBlockchainDemo";

export default function Home() {
  return (
    <main className="min-h-screen">
    <HomeHeroSection/>
    <WholeBlockchainDemo/>
  </main>
  );
}
