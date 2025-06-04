"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CriticalSmartContract() {
  const pages = [
    {
      title: "Immutability",
      points: [
        "If there’s a bug or you need to adjust logic, the deployed contract code itself is immutable. You must either live with the flaw or deploy a brand-new version and migrate state off-chain.",
        "Even a tiny typo or forgotten validation can become extremely costly: you can’t “hot-fix” it the way you would a normal server application.",
      ],
    },
    {
      title: "Gas Costs",
      points: [
        "Every interaction with the smart contract (creating, starting, completing a shipment) costs gas. During peak times, gas fees can spike and make micro-payments impractical.",
        "Complex on-chain logic (e.g., iterating over arrays, heavy loops) further increases gas consumption. If users can’t afford the fee, they simply won’t interact.",
      ],
    },
    {
      title: "Security Risks",
      points: [
        "Writing secure Solidity is hard—reentrancy bugs, overflow/underflow pitfalls, incorrect access control, or unchecked `transfer` calls can all lead to loss of funds.",
        "Even widely-audited libraries can have zero-day exploits. A single vulnerability can allow attackers to drain the entire contract’s balance or corrupt shipment state.",
      ],
    },
    {
      title: "Legal Uncertainty",
      points: [
        "Different jurisdictions treat blockchain transactions differently: are these binding contracts? What happens if a user disputes a delivery on-chain?",
        "Smart contracts lack the flexibility that legal frameworks offer (e.g., “buyer’s remorse,” partial refunds, manual arbitration). On-chain logic can’t easily incorporate off-chain context.",
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const goToPrevious = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(pages.length - 1, p + 1));

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
      {/* Page Title */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Smart contracts: a critical perspective
      </h2>

      {/* Card */}
      <div className="w-full max-w-prose bg-white rounded-xl border-t-4 border-red-600 shadow-lg py-12 px-8 lg:px-12">
        {/* Navigation Pills */}
        <nav className="flex justify-center space-x-3 mb-8">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition duration-200
                ${
                  idx === currentPage
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
            >
              {page.title}
            </button>
          ))}
        </nav>

        {/* Animated Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">
              Disadvantage: {pages[currentPage].title}
            </h3>

            <ul className="text-lg text-gray-700 leading-relaxed mb-8 list-disc pl-6 space-y-4 lg:columns-2 lg:gap-x-8">
              {pages[currentPage].points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {pages.map((_, idx) => (
                <span
                  key={idx}
                  className={`
                    w-3 h-3 rounded-full transition 
                    ${idx === currentPage ? "bg-red-600" : "bg-gray-300"}
                  `}
                />
              ))}
            </div>

            {/* Pagination Controls + Jump-To */}
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
                        : "bg-red-600 text-white hover:bg-red-700"
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
                        : "bg-red-600 text-white hover:bg-red-700"
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