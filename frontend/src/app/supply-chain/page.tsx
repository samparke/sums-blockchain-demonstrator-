"use client"

import SupplyChainIntro from "@/components/supply-chain/SupplyChainIntro";
import SupplyChainTable from "@/components/supply-chain/SupplyChainTable";
import SupplyChainTimeline from "@/components/supply-chain/SupplyChainTimeline";

export default function SupplyChain() {
  return (
   <div>
      <SupplyChainIntro/>
      <SupplyChainTimeline/>
      <SupplyChainTable/>
      {/* <SupplyChainDemo/> */}
   </div>
  );
}