"use client"

import SupplyChainDashboard from "@/components/supply-chain/SupplyChainDashboard";
import SupplyChainIntro from "@/components/supply-chain/SupplyChainIntro";

export default function SupplyChain() {
  return (
   <div>
      <SupplyChainIntro/>
      <SupplyChainDashboard/>
   </div>
  );
}