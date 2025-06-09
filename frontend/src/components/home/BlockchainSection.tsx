"use client";

import React from "react";
import BlockchainDemo from "./demos/BlockchainDemo";
import { Blocks, Check, Cog, Link2 } from "lucide-react";
import { LinkSlashIcon } from "@heroicons/react/20/solid";

export const BlockchainSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 md:p-12">
          <h1 className="text-black text-2xl md:text-4xl font-semibold mb-2">
            Blockchain
          </h1>
          <div className="text-gray-700 mb-8">
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <Link2
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>The blockchain links blocks together in a chain.</span>
              </li>

              <li className="flex gap-x-3">
                <Cog
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  There are many types of blockchains, each using different
                  methods of mining or validating blocks.
                </span>
              </li>

              <li className="flex gap-x-3">
                <Blocks
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  In this demonstation, each block includes the block number,
                  nonce, data, the hash of the previous block, and its own
                  current hash. By including the previous block's hash, each
                  block is linked to the one before it.
                </span>
              </li>

              <li className="flex gap-x-3">
                <LinkSlashIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  Try changing the data in mined block, what happens? The chain
                  after the corrupted block becomes invalid, showing that the
                  data has altered. This is how the blockchain ensures data
                  cannot be secretly changed. It garentees reliable and
                  unaltered version of history of information.
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full space-y-5">
            <BlockchainDemo />
            <p>
              {" "}
              <i>
                See expanded demonstration:
                https://andersbrownworth.com/blockchain{" "}
              </i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
