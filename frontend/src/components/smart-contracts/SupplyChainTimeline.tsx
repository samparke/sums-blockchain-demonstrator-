"use client";

import React, { useState, useRef, useEffect } from "react";
import { AiFillFileAdd, AiFillTruck } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import StartShipment from "./buttons/StartShipment";
import CreateShipment from "./buttons/CreateShipment";
import CompleteShipment from "./buttons/CompleteShipment";
import SupplyChainInfoPopover from "./SupplyChainInfoPopover";

interface SupplyChainTimelineProps {
  onSuccess: () => void;
}

export default function SupplyChainTimeline({
  onSuccess,
}: SupplyChainTimelineProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 py-12 mt-5">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between mb-8">
        <h2 className="text-3xl font-medium text-gray-900">
          Supply Chain Management
        </h2>
        <SupplyChainInfoPopover />
        <div className="flex items-center space-x-4">
          <ConnectButton
            accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
          />

          <div className="relative" ref={popoverRef}>
            <button
              type="button"
              onClick={() => setPopoverOpen((prev) => !prev)}
              className="flex items-center text-sm text-gray-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-400 hover:text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Show information</span>
            </button>

            {popoverOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    What are wallets?
                  </h3>
                  <p className="text-sm text-gray-600">
                    To interact with a blockchain application, users need to
                    connect a digital wallet. Think of the wallet as a secure,
                    personal gateway that proves who you are and allows you to
                    approve actions, like creating or updating shipments.
                  </p>
                  <a
                    href="https://support.metamask.io/start/getting-started-with-metamask/"
                    className="flex items-center text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Getting started with Metamask
                    <svg
                      className="w-2 h-2 ml-1.5"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
                <div className="absolute w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200 -top-1 right-4"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto lg:flex lg:space-x-12">
        <div className="lg:w-2/3 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 lg:mb-0">
          <div className="px-8 py-6 bg-gray-50">
            <p className="text-lg font-light text-gray-700 leading-relaxed">
              This simulation shows how smart contracts can provide end-to-end
              transparency in the supply chain. Follow each step below to
              interact with the contract.
            </p>
          </div>

          <div className="px-8 py-8">
            <ol className="flex flex-col space-y-10">
              <li className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center ring-4 ring-indigo-200">
                    <AiFillFileAdd className="text-indigo-600 text-3xl" />
                  </div>
                </div>
                <span className="hidden sm:block absolute left-7 top-16 bottom-0 w-px bg-gray-200" />
                <div className="mt-4 sm:mt-0 sm:ml-8 flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Create Shipment
                  </h3>
                  <p className="text-base font-light text-gray-600 mb-2">
                    Shipment is created! You will recieve the shipment ID.{" "}
                    <strong>Remember this!</strong> It'll be used to start and
                    complete your shipment.
                  </p>
                  <CreateShipment onSuccess={onSuccess} />
                </div>
              </li>

              <li className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center ring-4 ring-indigo-200">
                    <AiFillTruck className="text-indigo-600 text-3xl" />
                  </div>
                </div>
                <span className="hidden sm:block absolute left-7 top-16 bottom-0 w-px bg-gray-200" />
                <div className="mt-4 sm:mt-0 sm:ml-8 flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Start Shipment
                  </h3>
                  <p className="text-base font-light text-gray-600 mb-2">
                    The shipment leaves the manufacturing facility. Status
                    changes to “In Transit”.
                  </p>
                  <StartShipment onSuccess={onSuccess} />
                </div>
              </li>

              <li className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center ring-4 ring-indigo-200">
                    <IoShieldCheckmarkSharp className="text-indigo-600 text-3xl" />
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-8 flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Complete Shipment
                  </h3>
                  <p className="text-base font-light text-gray-600 mb-2">
                    The shipment arrives at its destination, logging arrival to
                    ensure full transparency.
                  </p>
                  <CompleteShipment onSuccess={onSuccess} />
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              See this contracts code!
            </h4>
            <p className="text-gray-600 font-light leading-relaxed">
              Given smart contracts on public blockchains are fully transparent,
              anyone can review the contracts code and verify how the system
              works for themselves. This reduces the risk of hidden
              functionality or manipulation.
            </p>
            <a
              className="flex items-center text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium mt-5"
              href="https://sepolia.etherscan.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View contracts on Sepolia testnet
            </a>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              Testnets for Safe Experimentation
            </h4>
            <p className="text-gray-600 font-light leading-relaxed">
              This contract is deployed on Sepolia, a test network ("testnet")
              that simulates the Ethereum blockchain without using real money.
              Testnets allow developers to experiment with deploying and
              interacting with contracts in a risk-free environment.
            </p>
            <a
              className="flex items-center text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium mt-5"
              href="https://www.alchemy.com/overviews/what-are-testnets"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more on testnets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
