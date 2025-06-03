"use client";

import React from "react";
import HashDemo from "./demos/HashDemo";

export const HashSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Produces a unique, fixed-length output for any input</li>
              <li>Even a tiny input change drastically alters the hash</li>
              <li>Ensures data integrity in blockchain networks</li>
              <li>Irreversible: you cannot recover original data from the hash</li>
              <li>SHA-256 is widely used in cryptocurrency mining</li>
            </ul>
          </div>
          
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12">
            <h1 className="text-black text-3xl md:text-5xl font-extrabold mb-2">
              Hashing
            </h1>
            <HashDemo />
          </div>

        </div>
      </div>
    </section>
  );
};