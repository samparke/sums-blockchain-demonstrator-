"use client";

import React from "react";
import BlockchainDemo from "./demos/BlockchainDemo";
import { Blocks, Check, Cog, Link2 } from "lucide-react";
import { GlobeAltIcon, LinkSlashIcon } from "@heroicons/react/20/solid";

export const BlockchainSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-black text-2xl md:text-4xl font-semibold">
              1.3: Blockchain
            </h1>
            <p className="text-sm text-gray-500 italic">
              * this page is scrollable
            </p>
          </div>
          <div className="text-gray-700 mb-8">
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <Link2
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>Blockchain is simply a chain of connected blocks.</span>
              </li>

              <li className="flex gap-x-3">
                <span>
                  <strong> Try now: </strong> <br />
                  <br />
                  <li className="flex gap-x-3">
                    <Blocks
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-black"
                    />
                    Step 1: There are five block in this example (scroll
                    horizontally).Type anything you like into each block, then
                    click the 'Mine' button at each stage after entering the
                    data. When all are connected all in green.
                  </li>{" "}
                  <br />
                  <li className="flex gap-x-3">
                    {" "}
                    <LinkSlashIcon
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-black"
                    />
                    Step 2: Now, change the data in any of the blocks. As soon
                    as you do, the chain after the altered block becomes
                    invalid, showing that the data has been tampered with. This
                    demonstrates how blockchain ensures data cannot be secretly
                    modified. It guarantees a reliable and unaltered record of
                    information history.
                  </li>
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full space-y-5">
            <BlockchainDemo />
            <p>
              <i className="text-gray-800">
                See expanded demonstration:
                https://andersbrownworth.com/blockchain
              </i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
