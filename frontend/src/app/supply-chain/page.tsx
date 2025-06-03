"use client"

import SupplyChainHeroSection from "@/components/supply-chain/SupplyChainHeroSection";
import SupplyChainDashboard from "@/components/supply-chain/SupplyChainDashboard";
import SupplyChainIntro from "@/components/supply-chain/SupplyChainIntro";

export default function SupplyChain() {
  return (
   <div>
      <SupplyChainHeroSection/>
      {/* <SupplyChainIntro/> */}
      <SupplyChainDashboard/>
   </div>
  );
}