// components/SmartHero.tsx
"use client";

import React from "react";
import {
  CodeBracketSquareIcon,
  DocumentMagnifyingGlassIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

const SmartHero: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-0 lg:overflow-visible">
      <div className="absolute inset-0 -z-10 overflow-hidden"></div>

      <div
        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16
                      lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
      >
        <div
          className="lg:col-span-2 lg:col-start-1 lg:row-start-1
                        lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2
                        lg:gap-x-8 lg:px-8"
        >
          <div className="lg:pr-4 lg:max-w-lg">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Smart Contracts
            </h1>
          </div>
        </div>

        <div
          className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4
                        lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
        >
          <DotLottieReact
            src="https://lottie.host/12bea3b7-f704-4a49-a17e-d8f21592a63d/ZhOCWtPmVQ.lottie"
            loop
            autoplay
            className="w-full max-w-lg h-auto md:max-w-none md:w-[800px] md:h-[400px]"
          />
        </div>

        <div
          className="lg:col-span-2 lg:col-start-1 lg:row-start-2
                        lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2
                        lg:gap-x-8 lg:px-8"
        >
          <ul role="list" className="space-y-8 text-gray-600 lg:pr-4">
            <li className="flex gap-x-3">
              <CodeBracketSquareIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Self-Executing
                </strong>{" "}
                Smart contracts can automatically trigger actions once
                conditions are met without intermediaries. For example, a
                payment may be automatically released once a shipment reaches
                the next facility in a supply chain.
              </span>
            </li>
            <li className="flex gap-x-3">
              <DocumentMagnifyingGlassIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Transparent Code
                </strong>{" "}
                On public blockchains, every transaction is recorded openly and
                permanently. You can trace the full history of actions in the
                contract, with details like timestamps and links to previous
                blocks - ensuring complete visibility and accountability.
              </span>
            </li>
            <li className="flex gap-x-3">
              <LockClosedIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Immutable
                </strong>{" "}
                Once a smart contract is deployed, its code and data cannot be
                altered. The blockchain’s cryptographic structure means any
                attempt to modify a block would break the entire chain, making
                tampering virtually impossible.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SmartHero;
