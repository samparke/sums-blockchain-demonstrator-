"use client";

import React from "react";
import HashDemo from "./demos/HashDemo";

export const HashSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hashing creates a unique digital fingerprint to prove that data hasn't changed.</li>
              <br />
              <li>Notice how a tiny change in input results in a completely different hash.</li>
              <br />
              <li>The output is always fixed-length, no matter how small or large the input (e.g., a single letter or entire document).</li>
              <br />
              <li>If data is altered, the hash changes, making tampering easy to detect.</li>
              <br />
              <li>Hashes are one way and irreversible - you cannot work backwards to recover the original data. <i>(Note: while this is true for the foreseeable future, advances in quantum computing could challenge current methods, which is where quantum-resistant alternatives would be used)</i></li>
              <br />
              <li>There are different hashing algorithms - this demo uses SHA-256.</li>
            </ul>
          </div>
          
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 space-y-5">
            <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-2">
              Hashing
            </h1>
            <HashDemo />
            <p>https://andersbrownworth.com/blockchain/</p>
          </div>

        </div>
      </div>
    </section>
  );
};