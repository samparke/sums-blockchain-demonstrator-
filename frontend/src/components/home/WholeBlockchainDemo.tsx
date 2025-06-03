// components/SectionPager.tsx
"use client";

import React, { useState } from "react";
import { HashSection } from "./HashSection";
import { BlockSection } from "./BlockSection";
import { BlockchainSection } from "./BlockchainSection";

const sections = [
  { id: 0, label: "Hashing", component: <HashSection /> },
  { id: 1, label: "Block", component: <BlockSection /> },
  { id: 2, label: "Blockchain", component: <BlockchainSection /> },
];

const WholeBlockchainDemo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex((idx) => (idx === 0 ? sections.length - 1 : idx - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((idx) => (idx === sections.length - 1 ? 0 : idx + 1));
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      {/* ─── Buttons to switch sections ─── */}
      <div className="flex justify-center space-x-2 mb-6">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => goToSlide(sec.id)}
            className={`
              px-3 py-1 rounded-md 
              ${
                currentIndex === sec.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* ─── The “current” section ─── */}
      <div className="relative">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`
              ${idx === currentIndex ? "block opacity-100" : "hidden opacity-0"}
              transition-opacity duration-300
            `}
          >
            {sec.component}
          </div>
        ))}
      </div>

      {/* ─── Prev / Next controls ─── */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevSlide}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
        >
          Previous
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WholeBlockchainDemo;