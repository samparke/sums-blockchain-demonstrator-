"use client";

import HomeHero from "@/components/home/HomeHero";
import WholeBlockchainDemo from "@/components/home/WholeBlockchainDemo";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeHero />
      <WholeBlockchainDemo />
    </main>
  );
}
