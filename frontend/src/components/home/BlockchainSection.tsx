"use client";

import React from "react";
import BlockchainDemo from "./demos/BlockchainDemo";

export const BlockchainSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12">
          
          <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-2">
            Blockchain
          </h1>
          <div className="text-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>A distributed ledger of linked blocks</li>
              <li>Each block contains timestamp, data, and a hash of the previous block</li>
              <li>Immutability: altering one block invalidates the rest of the chain</li>
              <li>Consensus algorithms ensure agreement among participants</li>
              <li>Enables transparent, tamper-proof transaction history</li>
            </ul>
          </div>

          <div className="w-full">
            <BlockchainDemo />
          </div>
          
        </div>
      </div>
    </section>
  );
};