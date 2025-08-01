"use client";

import React from "react";
import {
  Deck,
  Slide,
  Heading,
  Text,
  Box,
  FullScreen,
  Progress,
} from "spectacle";
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
import ThankYouPage from "@/components/thank-you/ThankYou";

export default function Presentation() {
  const template = () => (
    <>
      <Box
        position="absolute"
        bottom={0}
        right={0}
        padding="0.5em 1em"
        zIndex={10}
      >
        <Progress color="black" />
      </Box>

      <Box
        width="24px"
        height="24px"
        position="absolute"
        left={0}
        bottom={0}
        zIndex={10}
      >
        <FullScreen />
      </Box>

      <Box
        position="absolute"
        left={0}
        top={0}
        fontSize="0.3em"
        color="gray"
        zIndex={10}
      >
        Press &gt; key to move to the next slide
      </Box>
    </>
  );

  return (
    <Providers>
      <Deck template={template}>
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

        {/* THANK YOU  */}
        <Slide backgroundColor="white">
          <ThankYouPage />
        </Slide>
      </Deck>
    </Providers>
  );
}
