"use client";

import React from "react";
import { Deck, Slide, Heading, Text } from "spectacle";
import SmartHero from "@/components/smart-contracts/SmartHero";
import LearningPage from "../quiz/page";
import { Providers } from "../providers";
import HomeHero from "@/components/home/HomeHero";
import { HashSection } from "@/components/home/HashSection";
import { BlockSection } from "@/components/home/BlockSection";
import { BlockchainSection } from "@/components/home/BlockchainSection";
import SupplyChainDashboard from "@/components/smart-contracts/SupplyChainDashboard";
import CriticalSmartContract from "@/components/smart-contracts/CriticalSmartContracts";
import Introduction from "@/components/home/Introduction";
import QuizHero from "@/components/quiz/QuizHero";

export default function Presentation() {
  return (
    <Providers>
      <Deck>
        {/* HOME PAGE  */}

        <Slide backgroundColor="white">
          <HomeHero />
        </Slide>

        <Slide backgroundColor="white">
          <Introduction />
        </Slide>

        <Slide backgroundColor="white">
          <HashSection />
        </Slide>

        <Slide backgroundColor="white">
          <BlockSection />
        </Slide>

        <Slide backgroundColor="white">
          <div className="h-full overflow-y-auto p-8">
            <BlockchainSection />
          </div>
        </Slide>

        {/* SMART CONTRACTS PAGE */}

        <Slide backgroundColor="white">
          <SmartHero />
        </Slide>

        <Slide backgroundColor="white">
          <div className="h-full overflow-y-auto p-8">
            <SupplyChainDashboard />
          </div>
        </Slide>

        <Slide backgroundColor="white">
          <CriticalSmartContract />
        </Slide>

        {/* QUIZ */}

        <Slide backgroundColor="white">
          <QuizHero />
        </Slide>

        <Slide backgroundColor="white">
          <LearningPage />
        </Slide>

        <Slide backgroundColor="white">
          <Heading>Thank You!</Heading>
          <Text>Questions?</Text>
        </Slide>
      </Deck>
    </Providers>
  );
}
