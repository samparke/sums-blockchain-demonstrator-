"use client";

import React from "react";
import { AiFillFileAdd, AiFillTruck } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { ConnectButton } from "@rainbow-me/rainbowkit"; // or wherever your ConnectButton comes from
import StartShipment from "./buttons/StartShipment";
import CreateShipment from "./buttons/CreateShipment";
import CompleteShipment from "./buttons/CompleteShipment";

interface SupplyChainTimelineProps {
  onSuccess: () => void;
}

export default function SupplyChainTimeline({ onSuccess }: SupplyChainTimelineProps) {
  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 py-12 mt-5 rounded-2xl">
      <div className="w-full max-w-3xl flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Supply Chain Management
        </h2>
        <ConnectButton accountStatus={{ smallScreen: "avatar", largeScreen: "full" }} />
      </div>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 bg-gray-50">
          <p className="text-lg font-light text-gray-700 leading-relaxed">
            This simulation shows how smart contracts can automate logistics,
            reduce human error, and build trust in critical operations like
            pharmaceutical delivery. Follow each step below to interact with the
            contract.
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
                  Register a new vaccine batch on-chain: batch ID, drug type,
                  and destination—creating a permanent, traceable record.
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
                  changes to “In Transit,” with tracking data logged on-chain.
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
                  The shipment arrives at its destination (hospital or pharmacy),
                  logging arrival to ensure full transparency.
                </p>
                <CompleteShipment onSuccess={onSuccess} />
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}