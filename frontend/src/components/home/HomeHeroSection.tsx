"use client"

import React from "react";
import Image from "next/image";
import hash from "../../../public/images/hash.png"
import block from "../../../public/images/block.png"
import blockchain from "../../../public/images/blockchain.png"

export const HomeHeroSection: React.FC = () => (
  <section className="bg-white pt-20">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20">
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 md:p-12 mb-8">

        <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-4">
          Blockchain Demonstrator
        </h1>
        <h2 className="text-2xl font-normal text-black mb-2">
          Below are visual demonstrations that help explain how blockchain technology works behind the scenes.
        </h2>
      </div>
    </div>
  </section>
);
