"use client";

import CriticalSmartContract from "@/components/smart-contracts/CriticalSmartContracts";
import RecentShipments from "@/components/smart-contracts/RecentShipments";
import SmartHero from "@/components/smart-contracts/SmartHero";
import { SmartContractsHeroSection } from "@/components/smart-contracts/SmartContractsHeroSection";
import SupplyChainDashboard from "@/components/smart-contracts/SupplyChainDashboard";

export default function SupplyChain() {
  return (
    <div>
      <SmartHero />
      <SupplyChainDashboard />
      <CriticalSmartContract />
    </div>
  );
}
