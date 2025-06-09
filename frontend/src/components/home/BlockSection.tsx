"use client";

import React from "react";
import BlockDemo from "./demos/BlockDemo";
import { Calculator, CheckCircle, Hash } from "lucide-react";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";

export const BlockSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-zinc-50 border border-zinc-100 rounded-3xl p-8 md:p-12 space-y-5">
            <h1 className="text-black text-2xl md:text-4xl font-semibold mb-2">
              Block
            </h1>
            <BlockDemo />
            <p>
              {" "}
              <i>
                See expanded demonstration:
                https://andersbrownworth.com/blockchain{" "}
              </i>
            </p>
          </div>

          <div className="text-gray-700">
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CubeTransparentIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  This demo shows a simplified block, including the block
                  number, nonce, data, hash and "Mine" button.
                </span>
              </li>

              <li className="flex gap-x-3">
                <Hash
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  The block number, data and nonce are combined to create a hash
                  (remember: a unique digital fingerprint).
                </span>
              </li>

              <li className="flex gap-x-3">
                <Calculator
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  In this example, the hash must start with four zeros to be
                  considered valid - this is dependant on the blockchain's
                  difficulty level. To find such a hash, the system keeps
                  changing the nonce and rehashing until it meets the
                  requirements.
                </span>
              </li>

              <li className="flex gap-x-3">
                <CheckCircle
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  When a valid hash is found, the block is mined, and the miner
                  (in a real blockchain) receives a reward. The mine button
                  simulates the process: it rapidly tests nonce values until it
                  matches the hash.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
