"use client"

import HeroSection from "@/components/supply-chain/HeroSection";
import SupplyChainDashboard from "@/components/supply-chain/SupplyChainDashboard";
import SupplyChainIntro from "@/components/supply-chain/SupplyChainIntro";

export default function SupplyChain() {
  return (
   <div>
      <HeroSection/>
      {/* <SupplyChainIntro/> */}
      <SupplyChainDashboard/>
   </div>
  );
}