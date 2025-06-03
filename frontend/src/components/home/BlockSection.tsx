"use client";

import React from "react";
import BlockDemo from "./demos/BlockDemo";

export const BlockSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12">
            <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-2">
              Block
            </h1>
            <BlockDemo />
          </div>
          
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contains index, timestamp, data, nonce, previous hash, and current hash</li>
              <li>Proof-of-work: miners adjust nonce until hash meets difficulty target</li>
              <li>Each block links to the previous via its hash, forming a secure chain</li>
              <li>Tampering breaks the chain because hashes no longer match</li>
              <li>Blocks store transaction data or arbitrary payloads</li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};