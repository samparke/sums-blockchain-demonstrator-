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
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-gray-700">
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
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
                <Hash
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-black"
                />
                <span>
                  There are many hashing algorithms - this demo uses SHA-256, a
                  widely adopted standard.
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 bg-zinc-50 border border-zinc-100 rounded-3xl p-8 md:p-12 space-y-5">
            <h1 className="text-black text-2xl md:text-4xl font-semibold mb-2">
              Hashing
            </h1>
            <HashDemo />
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
