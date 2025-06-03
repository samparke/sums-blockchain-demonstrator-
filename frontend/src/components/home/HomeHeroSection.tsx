"use client"

import React from "react";
import Image from "next/image";
import hash from "../../../public/images/hash.png"
import block from "../../../public/images/block.png"
import blockchain from "../../../public/images/blockchain.png"

export const HomeHeroSection: React.FC = () => (
  <section className="bg-white pt-20">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20">
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">

        <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
          Blockchain
        </h1>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
          Static websites are now used to bootstrap lots of websites and are becoming the basis for a
          variety of tools that even influence both web designers and developers.
        </p>
      </div>

  
      <div className="grid md:grid-cols-3 gap-8">
      {/* card 1 */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6">
          <a
            href="#"
            className="bg-green-100 text-green-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-4"
          >
            1.
          </a>
          <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
            What is a Hash?
          </h2>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            Learn how hashing creates unique digital fingerprint to prove that data hasn't changed.
          </p>
          <div className="flex justify-center items-center">
          <Image className="rounded-xl"
                 src={hash}
                 alt="Hash"
                 width={250}
                 height={250}
                 />
          </div>
        </div>

        {/* card 2 */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6">
        <a
            href="#"
            className="bg-green-100 text-green-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-4"
          >
            2.
          </a>
          <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
            What is a Block?
          </h2>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
            Learn how a block stores a group of verified transactions in the Blockchain.
          </p>
          <div className="flex justify-center items-center">
            <Image
              className="rounded-xl"
              src={block}
              alt="Block"
              width={200}
              height={200}
            />
          </div>
        </div>

        {/* card 3 */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6">
        <a
            href="#"
            className="bg-green-100 text-green-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-4"
          >
            3.
          </a>
          <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
            What is a Blockchain?
          </h2>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
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
