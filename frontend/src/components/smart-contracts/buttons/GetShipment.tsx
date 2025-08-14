"use client";

import React, { useState } from "react";
import useSupplyChain from "@/hooks/useSupplyChain";

interface Shipment {
  sender: string;
  receiver: string;
  pickupTime: number;
  deliveryTime: number;
  distance: number;
  price: string;
  status: number;
  isPaid: boolean;
}

export default function GetShipment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexStr, setIndexStr] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // bring in getShipmentCount so we can pre-check and avoid contract errors
  const { getShipment, getShipmentCount, isPending, isConfirming } =
    useSupplyChain();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShipment(null);
    setErrorMessage("");

    if (!indexStr.trim()) {
      setErrorMessage("Please enter a shipment number");
      return;
    }

    const id1Based = parseInt(indexStr, 10);
    if (Number.isNaN(id1Based) || id1Based < 1) {
      setErrorMessage("Invalid shipment number. Enter 1 or higher.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Pre-validate against count to avoid ugly “revert” errors
      const count = await getShipmentCount();
      if (!count || count <= 0) {
        setErrorMessage("You don’t have any shipments yet.");
        return;
      }
      if (id1Based > count) {
        setErrorMessage(
          `Shipment not found. Enter a number between 1 and ${count}.`
        );
        return;
      }

      // Safe to read
      const zeroBasedIndex = id1Based - 1;
      const result = await getShipment(zeroBasedIndex);
      setShipment(result);
    } catch (error: any) {
      console.error(error);
      // Friendly fallback no matter what the underlying error looks like
      setErrorMessage(
        "Could not fetch that shipment. Please check the number and try again."
      );
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
                      Shipment number
                    </label>
                    <input
                      id="shipment-id"
                      type="number"
                      min={1}
                      step={1}
                      placeholder="e.g. 1"
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
                        {
                          ["PENDING", "IN_TRANSIT", "DELIVERED"][
                            shipment.status
                          ]
                        }
                      </li>
                      <li>
                        <strong>Paid:</strong> {shipment.isPaid ? "Yes" : "No"}
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
