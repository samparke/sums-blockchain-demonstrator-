"use client";

import React from "react";
import Image from "next/image";
import hashImg from "../../../public/images/hash.png";
import blockImg from "../../../public/images/block.png";
import blockchainImg from "../../../public/images/blockchain.png";

export const HomeHeroSection: React.FC = () => (
  <section className="bg-gradient-to-b from-indigo-50 to-white py-20 mt-10">
    <div className="container mx-auto px-4 lg:px-8 max-w-screen-lg">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md shadow-indigo-200 mb-4">
        <h1 className="text-3xl font-semibold md:text-5xl text-gray-900 mb-4">
          Blockchain Demonstrator
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
          This page contains visual demonstrations that help explain how blockchain
          technology works behind the scenes.
        </h2>
      </div>

      <div className="flex justify-center items-center mb-5">
      <h3 className="text-lg font-medium md:text-xl text-gray-700 leading-relaxed">
          This includes:
      </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow duration-200">
          <div className="flex justify-center items-center relative w-full h-48 pt-10">
            <Image
              src={hashImg}
              alt="Hash Function Illustration"
              width={220}
              height={220}
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Hash Function
            </h3>
            <p className="text-gray-600 leading-relaxed">
              See how input data is transformed into a fixed-size hash. This
              ensures data integrity—any change to the input produces a
              completely different output.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-center relative w-full h-48">
            <Image
              src={blockImg}
              alt="Block Structure Illustration"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Block Structure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Explore how transactions, timestamp, and previous hash are
              packaged into a block. Each block links to the prior one, forming
              an immutable chain.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-center relative w-full h-48">
            <Image
              src={blockchainImg}
              width={400}
              height={400}
              alt="Blockchain Linking Illustration"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chain Linking
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Visualize how blocks connect through hashes. This chaining
              mechanism prevents tampering—altering one block invalidates all
              subsequent blocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);