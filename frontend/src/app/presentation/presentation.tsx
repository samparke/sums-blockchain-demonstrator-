// pages/presentation.tsx
"use client";

import React from "react";
import { Deck, Slide, Heading, Text } from "spectacle";
import Home from "../page";
import SupplyChain from "../smart-contracts/page";
import LearningPage from "../quiz/page";
import { Providers } from "../providers";
import HomeHero from "@/components/home/HomeHero";

export default function Presentation() {
  return (
    <Providers>
      <Deck template={<Text padding="10px">🚀 Blockchain Demo</Text>}>
        <Slide>
          <HomeHero />
        </Slide>

        <Slide>
          <SupplyChain />
        </Slide>

        <Slide>
          <LearningPage />
        </Slide>

        <Slide>
          <Heading>Thank You!</Heading>
          <Text>Questions?</Text>
        </Slide>
      </Deck>
    </Providers>
  );
}
