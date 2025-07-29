"use client";

import React from "react";
import { Deck, Slide, Heading, Text } from "spectacle";
import SupplyChain from "../smart-contracts/page";
import LearningPage from "../quiz/page";
import { Providers } from "../providers";
import HomeHero from "@/components/home/HomeHero";
import { HashSection } from "@/components/home/HashSection";
import { BlockSection } from "@/components/home/BlockSection";
import { BlockchainSection } from "@/components/home/BlockchainSection";

export default function Presentation() {
  return (
    <Providers>
      <Deck>
        <Slide backgroundColor="white">
          <HomeHero />
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

        <Slide backgroundColor="white">
          <SupplyChain />
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
