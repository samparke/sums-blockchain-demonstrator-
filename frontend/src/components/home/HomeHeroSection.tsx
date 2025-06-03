"use client"

import React from "react";
import Image from "next/image";
import hash from "../../../public/images/hash.png"
import block from "../../../public/images/block.png"
import blockchain from "../../../public/images/blockchain.png"

export const HomeHeroSection: React.FC = () => (
  <section className="bg-white pt-20">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 mb-8">

        <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-2">
          Blockchain
        </h1>
        <h2 className="text-2xl font-normal text-gray-100 mb-6">
          The future of data integrity.
        </h2>
      </div>

      <div className="flex justify-center items-center">
      <h2 className="text-2xl font-normal text-gray-800 mb-8">
          From this page, you will be able to answer:
        </h2>
        </div>
      <div className="grid md:grid-cols-3 gap-8">
      {/* card 1 */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-6">
          <a
            href="#"
            className="text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-4"
          >
            1.
          </a>
          <h2 className="text-white text-3xl font-extrabold mb-2">
            What is a Hash?
          </h2>
          <p className="text-lg font-normal text-gray-300 mb-6">
            Learn how hashing creates unique digital fingerprint to prove that data hasn't changed.
          </p>
          <div className="flex justify-center items-center">
          <Image className="rounded-xl"
                 src={hash}
                 alt="Hash"
                 width={200}
                 height={200}
                 />
          </div>
        </div>

        {/* card 2 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6">
        <a
            href="#"
            className="text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-4"
          >
            2.
          </a>
          <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
            What is a Block?
          </h2>
          <p className="text-lg font-normal text-gray-300 mb-4">
            Learn how a block stores a group of verified transactions in the Blockchain.
          </p>
          <div className="flex justify-center items-center">
            <Image
              className="rounded-xl"
              src={block}
              alt="Block"
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* card 3 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6">
        <a
            href="#"
            className="text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-4"
          >
            3.
          </a>
          <h2 className="text-white text-3xl font-extrabold mb-2">
            What is a Blockchain?
          </h2>
          <p className="text-lg font-normal text-gray-300 mb-4">
            Learn how the Blockchain links blocks together to form a secure and trusted record of data.
          </p>
          <div className="flex justify-center items-center">
          <Image className="rounded-xl"
                 src={blockchain}
                 alt="Blockchain"
                 width={500}
                 height={500}
                 />
          </div>
        </div>
      </div>
    </div>
  </section>
);
