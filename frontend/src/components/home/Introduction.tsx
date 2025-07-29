// components/Introduction.tsx
import React from "react";
import { Link2, FileText, HelpCircle } from "lucide-react";

const Introduction: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">Introduction</h1>
        <div className="mt-6 space-y-6 text-lg text-gray-700">
          <p>
            Blockchain technology is becoming increasingly important because it
            helps keep information secure, clear, and easy to check. It allows
            people and organisations to share data and make transactions without
            needing a central authority, which builds trust and saves time.
            Blockchain technology is used in various industry sectors, including
            finance, healthcare, supply chain, energy, real estate, and
            government services, to improve security, transparency, and
            efficiency.
          </p>
          <p>
            This demonstrator helps you understand the basics of blockchain
            technology. First, it explains what a "block" is and how blocks are
            linked together to form a chain. It also introduces the concept of
            "smart contracts", self-executing agreements, and shows how they can
            be used to automate processes securely and reliably.
          </p>
          <p>
            There is also a quiz to help reinforce your understanding of the key
            concepts covered, allowing you to test your knowledge of how
            blockchain works and how it can be applied in different situations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-sm ">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Link2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Blockchain
            </h3>
          </div>

          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-sm ">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Smart Contracts
            </h3>
          </div>

          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-sm ">
            <div className="bg-indigo-100 p-3 rounded-full">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Quiz</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
