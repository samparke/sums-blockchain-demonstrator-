"use client"

import {AiFillFileAdd} from "react-icons/ai"
import { AiFillTruck } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import StartShipment from "./buttons/StartShipment";
import CreateShipment from "./buttons/CreateShipment";
import CompleteShipment from "./buttons/CompleteShipment";

export default function SupplyChainTimeline() {
    return(
        <div className="w-full px-6 lg:px-10 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
                How Blockchain can Improve Traceability: Play as a Pharmaceutical company "____"
        </h2>
        <div className="flex w-full justify-center items-center px-10 mt-20 mb-20">
        <ol className="items-center sm:flex">
            <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-18 h-18 bg-blue-100 rounded-full ring-0 ring-blue-100 sm:ring-8 shrink-0">
                        <AiFillFileAdd className="text-blue-500 text-5xl"/>
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-900">Create Shipment</h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-500">A new shipment of pharmaceutical products are created in the system.</p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Batch number, drug type, destination are recorded immutably on the blockchain.</p>
                    <CreateShipment/>
                </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-18 h-18 bg-blue-100 rounded-full ring-0 ring-blue-100 sm:ring-8 shrink-0">
                        <AiFillTruck className="text-blue-500 text-5xl"/>
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-900">Start Shipment</h3>
                    <p className="text-base font-normal text-gray-500">The shipment leaves the manufacturing facility and enters logisitics process.</p>
                    <p className="text-base font-normal text-gray-400">The status changes to 'in-transit', logged on-chain with additions of updated data.</p>
                    <StartShipment/>
                </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-18 h-18 bg-blue-100 rounded-full ring-0 ring-blue-100 sm:ring-8 shrink-0">
                    <IoShieldCheckmarkSharp  className="text-blue-500 text-5xl"/>
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-900">Complete Shipment</h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-500">The shipment arrives at the facility (hospital, pharmacy).</p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Logs arrival, ensuring transparency across the supply chain.</p>
                    <CompleteShipment/>
                </div>
            </li>
        </ol>
    </div>
    </div>
    )
}