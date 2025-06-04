"use client";

import React from "react";
import BlockchainDemo from "./demos/BlockchainDemo";

export const BlockchainSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12">
          
          <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-2">
            Blockchain
          </h1>
          <div className="text-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The blockchain links blocks together in a chain.</li>
              <li>Each block includes the block number, nonce, data, the hash of the previous block, and its own current hash.</li>
              <li>By including the previous block's hash, each block is linked to the one before it.</li>
              <li>Try changing the data in mined block, what happens?</li>
              <li>The entire chain becomes invalid, showing that the data has altered.</li>
              <li>This is how the blockchain ensures data cannot be secretly changed. It garentees reliable and unaltered version of history of information.</li>
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