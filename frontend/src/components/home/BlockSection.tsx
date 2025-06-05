"use client";

import React from "react";
import BlockDemo from "./demos/BlockDemo";

export const BlockSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 space-y-5">
            <h1 className="text-black text-3xl md:text-5xl font-semibold mb-2">
              Block
            </h1>
            <BlockDemo />
            <p>https://andersbrownworth.com/blockchain/</p>
          </div>
          
          <div className="text-gray-700">
            <h2 className="text-2xl font-medium mb-4">Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>This demo shows a simplified block, including the block number, nonce, data, hash and "Mine" button.</li>
              <br />
              <li>This is slightly more technical, but aim to grasp the overall concept.</li>
              <br />
              <li>The block number, data and nonce are combined to create a hash (remember: a unique digital fingerprint)</li>
              <br />
              <li>In this example, the hash must start with four zeros to be considered valid. This condition represents the blockchain's difficulty level.</li>
              <br />
              <li>To find such a hash, the system keeps changing the nonce and rehashing until it meets the requirements.</li>
              <br />
              <li>When a valid hash is found, the block is mined, and the miner (in a real blockchain) receives a reward.</li>
              <br />
              <li>The mine button simulates the process: it rapidly tests nonce values until it matches the hash.</li>
              <br />
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};