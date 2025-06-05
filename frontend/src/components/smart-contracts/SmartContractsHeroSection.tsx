"use client";

import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

export const SmartContractsHeroSection: React.FC = () => (
  <section className="bg-gradient-to-b from-indigo-50 to-white py-20 mt-10">
    <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-white border border-gray-200 shadow-lg shadow-indigo-200 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Smart Contracts
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-gray-800 mb-6 leading-snug">
            Digital agreements that run themselves—securely, automatically, and without middlemen.
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Platforms like Ethereum let businesses automate complex processes with full transparency and trust,
            removing guesswork and manual reconciliation.
          </p>
          <div className="mt-8">
          <a
            href="https://ethereum.org/en/smart-contracts/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white text-base font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
          >
            Learn More
          </a>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            Business Benefits
          </h2>
          <ul className="space-y-4">
            {[
              "Automatically executes agreements when conditions are met—no human input needed.",
              "Reduces delays, costs, and the need for trusted third parties.",
              "Transparent and accessible—anyone can view the contract on public blockchains like Ethereum.",
              "Used in industries like finance, logistics, real estate, and insurance.",
              "Enables innovation in decentralized finance (DeFi), digital identity, and supply chain automation.",
              "Once deployed, terms cannot be altered—ensuring full integrity and trust.",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <AiOutlineCheck className="flex-shrink-0 mt-1 text-indigo-600 text-xl" />
                <span className="ml-3 text-lg text-gray-800 font-light leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <h2 className="text-xl font-light md:text-2xl text-center text-gray-800 leading-relaxed max-w-2xl">
          Below is an example of how a smart contract can automate key steps in a supply chain{" "}
          <span className="italic">(in a real-world scenario, these actions would be triggered automatically)</span>.
        </h2>
      </div>
    </div>
  </section>
);