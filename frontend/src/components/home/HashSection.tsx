"use client";

import React from "react";
import HashDemo from "./demos/HashDemo";
import {
  Bars3CenterLeftIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { Hash } from "lucide-react";

export const HashSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-gray-700">
            <h1 className="text-black text-2xl md:text-4xl font-semibold mb-10 mt-5">
              1.1: Hashing
            </h1>
            <ul role="list" className="mt-8 space-y-12 text-gray-600">
              <li className="flex gap-x-3">
                <FingerPrintIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  Hashing creates a unique digital fingerprint to prove that
                  data hasn't changed. Notice how a tiny change in input results
                  in a completely different hash.
                </span>
              </li>

              <li className="flex gap-x-3">
                <Bars3CenterLeftIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  The output is always fixed-length, no matter how small or
                  large the input (e.g., a single letter or entire document).
                </span>
              </li>

              <li className="flex gap-x-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  Hashes are one way and irreversible - you cannot work
                  backwards to recover the original data.{" "}
                </span>
              </li>

              <li className="flex gap-x-3">
                {/* <Hash
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                /> */}
                <span>
                  <strong>Try now:</strong> Type “Hello” (or any text you like)
                  into the Data area and observe the new hash it generates.
                  Then, add another word, such as your name. You will see that
                  this creates a completely different hash.
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 rounded-3xl space-y-5">
            <HashDemo />
            <p>
              {" "}
              <i className="text-gray-800">
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
