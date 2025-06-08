// components/Example.tsx
import React from "react";
import {
  CodeBracketSquareIcon,
  DocumentMagnifyingGlassIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SmartHero: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="50%"
              y={-1}
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern)"
            strokeWidth={0}
          />
        </svg>
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-600">
                Sheffield Management School
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Smart Contracts
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
                An introduction to smart contracts for Sheffield Management
                School students.
              </p>
            </div>
          </div>
        </div>

        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <DotLottieReact
            src="https://lottie.host/12bea3b7-f704-4a49-a17e-d8f21592a63d/ZhOCWtPmVQ.lottie"
            loop
            autoplay
            style={{ height: 400, width: 800 }}
          />
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CodeBracketSquareIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Self-Executing
                    </strong>{" "}
                    Smart contracts automatically trigger actions once
                    conditions are met—no intermediaries required. This reduces
                    delays, cuts costs, and ensures trusted execution with no
                    room for manual interference.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <DocumentMagnifyingGlassIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Transparent Code
                    </strong>{" "}
                    Every transaction is recorded openly and permanently. You
                    can trace the full history of actions in the contract, with
                    details like timestamps and links to previous
                    blocks—ensuring complete visibility and accountability.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Immutable
                    </strong>{" "}
                    Once a smart contract is deployed, its code and data cannot
                    be altered. The blockchain’s cryptographic structure means
                    any attempt to modify a block would break the entire chain,
                    making tampering virtually impossible.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHero;
