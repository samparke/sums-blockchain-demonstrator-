// components/SmartHero.tsx
import React from "react";
import Image from "next/image";
import {
  CodeBracketSquareIcon,
  DocumentMagnifyingGlassIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const SmartHero: React.FC = () => (
  <section className="relative bg-white overflow-hidden px-6 py-24 sm:py-32">
    <div className="absolute inset-0 -z-10" />

    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="space-y-8 lg:pr-8">
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
          Smart Contracts
        </h2>
        <ul className="space-y-6 text-gray-600">
          <li className="flex items-start gap-4">
            <CodeBracketSquareIcon className="h-6 w-6 flex-none text-indigo-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Digital programs</h3>
              <p>
                Smart contracts are like small programs which execute digital
                instructions. If X condition is met, do Y. These state changes
                are validated by nodes and put on a blockchain.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <DocumentMagnifyingGlassIcon className="h-6 w-6 flex-none text-indigo-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Transparent Code</h3>
              <p>
                Every transaction on public blockchains is recorded openly and
                permanently. You can trace the full history, ensuring visibility
                and accountability.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <LockClosedIcon className="h-6 w-6 flex-none text-indigo-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Immutable</h3>
              <p>
                Once deployed, smart contract code cannot be altered. The
                blockchain’s cryptographic integrity prevents tampering.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="relative w-full max-w-[800px] mx-auto aspect-video">
        <Image
          src="/images/smart-contract.png"
          alt="Smart Contracts graphic"
          fill
          sizes="(max-width: 800px) 100vw, 800px"
          className="object-contain"
        />
      </div>
    </div>
  </section>
);

export default SmartHero;
