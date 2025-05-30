"use client"

import {AiOutlineFileAdd} from "react-icons/ai"
import { AiOutlineTruck } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi";

export default function SupplyChainButtons() {
  return (
    <div className="py-10 px-20 flex flex-col items-center space-y-10">
      <div className="w-full max-w-5xl mx-auto bg-zinc-100 rounded-xl p-20">
        <h1 className="text-3xl font-bold text-gray-800 pb-10">
        Demo
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button className="w-64 bg-red-100 rounded-md text-center py-5 border border-red-200 hover:bg-red-200 transition duration-150 cursor-pointer">
          <div className="flex flex-col justify-center items-center space-y-2">
            <AiOutlineFileAdd className="text-4xl text-red-800" />
            <span className="font-sans">Create Shipment</span>
          </div>
        </button>

        <button className="w-64 bg-blue-100 rounded-md text-center py-5 border border-blue-200 hover:bg-blue-200 transition duration-150 cursor-pointer">
          <div className="flex flex-col justify-center items-center space-y-2">
            <AiOutlineTruck className="text-4xl text-blue-800" />
            <span>Start Shipment</span>
          </div>
        </button>

        <button className="w-64 bg-green-100 rounded-md text-center py-5 border border-green-200 hover:bg-green-200 transition duration-150 cursor-pointer">
          <div className="flex flex-col justify-center items-center space-y-2">
            <HiOutlineShieldCheck className="text-4xl text-green-800" />
            <span>Complete Shipment</span>
          </div>
        </button>
      </div>
    </div>
    </div>
  );
}