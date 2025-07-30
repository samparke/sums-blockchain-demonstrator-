"use client";

import React from "react";
import BlockDemo from "./demos/BlockDemo";
import { Calculator, CheckCircle, Hash } from "lucide-react";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";

export const BlockSection: React.FC = () => {
  return (
    <section className="pt-10">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <h1 className="text-black text-2xl md:text-4xl font-semibold mt-5">
          1.2: Block
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 rounded-3xl space-y-5">
            <BlockDemo />
            <p>
              {" "}
              <i className="text-gray-800">
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
                  In addition to Data and Hash you saw in the previous step, a
                  block has a Block number, nonce and Mine button.
                </span>
              </li>

              <li className="flex gap-x-3">
                <Hash
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  Block Number: A numerical identifier that indicates the
                  block’s position within the blockchain (e.g., Block 0 is the
                  first block)
                </span>
              </li>

              <li className="flex gap-x-3">
                <Calculator
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  Nonce: A random number that is adjusted during the mining
                  process (see below) to find a valid hash that meets specific
                  conditions.
                </span>
              </li>

              <li className="flex gap-x-3">
                <CheckCircle
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  Mine Button: A user interface element that initiates the
                  mining process. When clicked, it triggers the search for a
                  valid nonce that will produce a hash meeting the blockchain's
                  difficulty requirement.
                </span>
              </li>

              <li className="flex gap-x-3">
                <span>
                  <strong>Try now:</strong> Type something into the Data field
                  and click Mine! Notice how any changes to the data once a
                  block has been mined will invalidate block. The next slide
                  will demonstrate the significance of this!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
