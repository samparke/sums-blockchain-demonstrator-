"use client"

import Image from "next/image"
import supplyChain from "../../../public/images/supplyChain.png"
import StartShipment from "./buttons/StartShipment"

export default function SupplyChainIntro() {
    return(
        <div className="flex flex-row justify-center items-center bg-zinc-100 space-x-20 content-center mt-20">
            <div className="w-full lg:w-1/2 flex justify-center">
            <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Supply Chain Tracability</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>


            <div className="w-full lg:w-1/2 text-center py-10">
                <Image className="rounded-xl"
                 src={supplyChain}
                 alt="Supply Chain"
                 width={400}
                 height={400}
                 />
            </div>
            </div>
    )
}