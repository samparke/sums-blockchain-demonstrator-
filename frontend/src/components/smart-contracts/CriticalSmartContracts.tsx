"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CriticalSmartContract() {
  const pages = [
    {
      title: "Immutability",
      points: [
        "Once a contract is live on a public blockchain, its code cannot be changed. This guarentees consistency and trust, but also means that flaws remain in place.",
        "Even a tiny typo or forgotten validation can become extremely costly. Unlike traditional software, you cannot simply patch live contracts. It requires deploying new contracts, or implementing an upgradable contract design - which, however, some argue removes the trustability of smart contracts.",
      ],
    },
    {
      title: "Privacy",
      points: [
        "Public blockchains reveal all contract interactions and data to anyone, which can conflicts with many businesses' need for confidentiality - such as supplier details or payment amounts.",
        "Techniques like 'zero-knowledge proofs' can help by verifying transactions without revealing sensitive information. However, these technologies are still evolving and can introduce additional complexity.",
        "Private blockchains, like Hyperledger and Corda, restrict the ledger to a select group of participants and use alternative consensus mechanisms - used by IBM and Walmart.",
      ],
    },
    {
      title: "Transaction Fees",
      points: [
        "Every interaction with a smart contract incurs a transaction fee. During peak times When network fees are high, these fees can rise and make payments impractical (especially smaller payments).",
        "'Layer 2' solutions aim to solve this, bundling transactions off the main blockchain, and submitting them together. This provides a low-cost, scalable alternative.",
      ],
    },
    {
      title: "Security Risks",
      points: [
        "Because smart contracts are immutable, even a small coding mistake, such as a typo or corrupted third-party library can lead to major financial losses.",
        "Smart contracts often rely on external sources of information, such as 'Oracles' or IOT sensors. If these sources are comprimised, an attacker can manipulate contract execution.",
      ],
    },
    {
      title: "Is Code Really Law?",
      points: [
        "Smart contract execute automatically, but they lack the flexibility of human judgement.",
        "Real-world agreements often depend on context, and oftentimes there are nuances that code can't cannot address.",
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const goToPrevious = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goToNext = () =>
    setCurrentPage((p) => Math.min(pages.length - 1, p + 1));

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-4 py-20">
      <h2 className="text-3xl font-medium text-gray-900 mb-8">
        Smart Contracts: A Critical Perspective
      </h2>

      <div className="w-full max-w-screen-md bg-white rounded-xl border-t-4 border-red-200 shadow-md shadow-red-200 py-12 px-8 lg:px-12">
        <nav className="flex justify-center space-x-3 mb-8">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition duration-200
                ${
                  idx === currentPage
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
            >
              {page.title}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-medium text-center text-gray-900 mb-6">
              {pages[currentPage].title}
            </h3>

            <ul className="text-lg font-light text-gray-700 leading-relaxed mb-8 list-disc pl-6 space-y-4 lg:columns-2 lg:gap-x-8">
              {pages[currentPage].points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <div className="flex justify-center space-x-2 mb-8">
              {pages.map((_, idx) => (
                <span
                  key={idx}
                  className={`
                    w-3 h-3 rounded-full transition 
                    ${idx === currentPage ? "bg-red-500" : "bg-gray-300"}
                  `}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0}
                className={`
                  text-sm font-medium px-3 py-1 rounded-md transition
                  ${
                    currentPage === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-800"
                  }
                `}
              >
                First
              </button>

              <div className="space-x-4">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 0}
                  className={`
                    px-4 py-2 rounded-md font-medium transition
                    ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }
                  `}
                >
                  Previous
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentPage === pages.length - 1}
                  className={`
                    px-4 py-2 rounded-md font-medium transition
                    ${
                      currentPage === pages.length - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }
                  `}
                >
                  Next
                </button>
              </div>

              <button
                onClick={() => setCurrentPage(pages.length - 1)}
                disabled={currentPage === pages.length - 1}
                className={`
                  text-sm font-medium px-3 py-1 rounded-md transition
                  ${
                    currentPage === pages.length - 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-800"
                  }
                `}
              >
                Last
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
