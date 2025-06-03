"use client"

import { SmartContractsHeroSection } from "@/components/smart-contracts/SmartContractsHeroSection";
import SupplyChainDashboard from "@/components/smart-contracts/SupplyChainDashboard";

export default function SupplyChain() {
  return (
   <div>
      <SmartContractsHeroSection/>
      <SupplyChainDashboard/>
   </div>
  );
}