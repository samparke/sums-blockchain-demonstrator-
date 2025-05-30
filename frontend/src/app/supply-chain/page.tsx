"use client"

import SupplyChainButtons from "@/components/supply-chain/SupplyChainButtons";
import SupplyChainIntro from "@/components/supply-chain/SupplyChainIntro";
import SupplyChainTimeline from "@/components/supply-chain/SupplyChainTimeline";

export default function SupplyChain() {
  return (
   <div>
      <SupplyChainIntro/>
      <SupplyChainTimeline/>
      <SupplyChainButtons/>
   </div>
  );
}