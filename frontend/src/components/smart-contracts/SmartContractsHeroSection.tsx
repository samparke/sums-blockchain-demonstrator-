"use client";

import React from "react";

export const SmartContractsHeroSection: React.FC = () => (
  <section className="bg-white pt-20">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* ─── Left: Headings ─── */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 md:p-12">
          <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-2">
            Smart Contracts
          </h1>
          <h2 className="text-2xl font-normal text-black mb-6">
            Self-executing agreements on blockchain
          </h2>
        </div>
        
        {/* ─── Right: Bullet Points ─── */}
        <div className="text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>A distributed ledger of linked blocks</li>
            <li>Each block contains timestamp, data, and a hash of the previous block</li>
            <li>Immutability: altering one block invalidates the rest of the chain</li>
            <li>Consensus algorithms ensure agreement among participants</li>
            <li>Enables transparent, tamper-proof transaction history</li>
          </ul>
        </div>

      </div>
    </div>
  </section>
);