"use client";

import React from "react";

export const SmartContractsHeroSection: React.FC = () => (
  <section className="bg-white pt-20">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 md:p-12">
          <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-4">
            Smart Contracts
          </h1>
          <h2 className="text-2xl font-normal text-black mb-6">
            Digital agreements that run themselves — securely, automatically, and without middlemen.
          </h2>
          <p className="text-lg text-gray-700">
            Smart contracts on platforms like Ethereum enable businesses to automate complex processes with full transparency and trust.
          </p>
        </div>

        <div className="text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Business Benefits</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            <li>Automatically executes agreements when conditions are met — no human input needed.</li>
            <li>Reduces delays, costs, and the need for trusted third parties.</li>
            <li>Transparent and accessible — anyone can view the contract on public blockchains like Ethereum.</li>
            <li>Used in industries like finance, logistics, real estate, and insurance.</li>
            <li>Enables innovation in decentralized finance (DeFi), digital identity, and supply chain automation.</li>
            <li>Once deployed, terms cannot be altered — ensuring full integrity and trust.</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
         <h2 className="text-2xl text-center text-black">
              Below is an example of how a smart contract can automate key steps in a supply chain <i>(in a real-world scenario, these actions would be triggered automatically.)</i>.
        </h2>
      </div>
    </div>
  </section>
);