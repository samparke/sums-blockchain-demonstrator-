"use client"

import React, {useState} from "react"
import useSupplyChain from "@/hooks/useSupplyChain"

interface Shipment {
    sender:string;
    receiver: string;
    pickupTime: number;
    deliveryTime: number;
    distance: number;
    price: string;
    status: number;
    isPaid: boolean;
}

export default function GetShipment () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexStr, setIndexStr] = useState("");
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("") ;

    const {getShipment, isPending, isConfirming, isError, error} = useSupplyChain();

    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setShipment(null);
        setErrorMessage("")
    

    if(!indexStr.trim()) { // checks whether user entered shipment ID
        setErrorMessage("Please enter a shipment ID");
        return;
    }

    const indexNum = Number(indexStr); // converts index string -> index number, and checks.
    if(isNaN(indexNum) || indexNum < 0) {
        setErrorMessage("Invalid shipment ID")
        return;
    }

    try {
        setLoading(true);
        const result = await getShipment(indexNum);
        setShipment(result);
    } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message || "Failed to fetch shipment");
    } finally {
        setLoading(false);
    }
    }; 

    return (
        <div>
          <button
            onClick={() => {
              setShipment(null);
              setErrorMessage("");
              setIndexStr("");
              setIsModalOpen(true);
            }}
            className="block text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            type="button"
          >
            Get Shipment
          </button>
    
          {isModalOpen && (
            <div
              id="get-shipment-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40"
            >
              <div className="relative p-4 w-full max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Get Shipment
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
    
                  <div className="p-4 space-y-4">
                    <form onSubmit={onSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="shipment-id"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Shipment ID
                        </label>
                        <input
                          id="shipment-id"
                          type="number"
                          min={0}
                          placeholder="e.g. 0"
                          value={indexStr}
                          onChange={(e) => setIndexStr(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
    
                      <button
                        type="submit"
                        disabled={loading || isPending || isConfirming}
                        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                      >
                        {loading
                          ? "Fetching..."
                          : isPending
                          ? "Submitting..."
                          : isConfirming
                          ? "Confirming..."
                          : "Fetch Shipment"}
                      </button>
                    </form>
    
                    {errorMessage && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errorMessage}
                      </p>
                    )}
    
                    {shipment && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                        <h4 className="text-lg font-medium text-white">
                          Shipment Details
                        </h4>
                        <ul className="mt-2 space-y-1 text-white">
                          <li>
                            <strong>Sender:</strong> {shipment.sender}
                          </li>
                          <li>
                            <strong>Receiver:</strong> {shipment.receiver}
                          </li>
                          <li>
                            <strong>Pickup Time:</strong>{" "}
                            {new Date(shipment.pickupTime * 1000).toLocaleString()}
                          </li>
                          <li>
                            <strong>Delivery Time:</strong>{" "}
                            {shipment.deliveryTime > 0
                              ? new Date(
                                  shipment.deliveryTime * 1000
                                ).toLocaleString()
                              : "Not delivered"}
                          </li>
                          <li>
                            <strong>Distance (km):</strong> {shipment.distance}
                          </li>
                          <li>
                            <strong>Price (ETH):</strong> {shipment.price}
                          </li>
                          <li>
                            <strong>Status:</strong>{" "}
                            {["PENDING", "IN_TRANSIT", "DELIVERED"][
                              shipment.status
                            ]}
                          </li>
                          <li>
                            <strong>Paid:</strong>{" "}
                            {shipment.isPaid ? "Yes" : "No"}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }