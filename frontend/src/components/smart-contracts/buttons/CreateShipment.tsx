"use client";

import React, { useState, useEffect } from "react";
import {parseEther} from "viem";
import useSupplyChain from "@/hooks/useSupplyChain";
import { useWaitForTransactionReceipt } from "wagmi";

interface CreateShipmentProps {
  onSuccess: () => void;
}

export default function CreateShipment({onSuccess} : CreateShipmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModelOpen, setSuccessModelOpen] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [priceEth, setPriceEth] = useState("");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const {createShipment, isPending, isError, error} = useSupplyChain();

  const {
    data: receipt,
    isLoading: isConfirming,  
    isSuccess: isConfirmed,    
    isError: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,         
    confirmations: 1,       
  });


  useEffect(() => {
    if (isConfirmed && txHash) {
      // alert(
      //   `Transaction confirmed!\n\nTx Hash: ${txHash}\n\nView on Sepolia:\nhttps://sepolia.etherscan.io/tx/${txHash}`
      // );
      setSuccessModelOpen(true);
      setIsModalOpen(false);
      setReceiver("");
      setPickupDate("");
      setDistance(0);
      setPriceEth("");
      setTxHash(undefined);

      onSuccess();
    }
  }, [isConfirmed, txHash, onSuccess]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !receiver.trim() ||
      !pickupDate ||
      distance <= 0 ||
      !priceEth.trim()
    ) {
      alert("Please fill out all fields.");
      return;
    }

      const pickupTimeUnix = Math.floor(new Date(pickupDate).getTime() / 1000)

      let priceWei: bigint;
      try {
        priceWei = parseEther(priceEth)
      } catch {
        alert("Invalid price. Use something like 0.05");
        return
      }

      try {
        const tx = await createShipment({
          receiver: receiver.trim(),
          pickupTime:pickupTimeUnix.toString(),
          distance,
          priceEtherString: priceEth,
        });
        setTxHash(tx);

        // setIsModalOpen(false);
        // setReceiver("");
        // setPickupDate("");
        // setDistance(0);
        // setPriceEth("");
        // onSuccess();
      } catch (error:any) {
          console.error(error);
          alert(error.message || "Transaction failed")
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          setTxHash(undefined)
          setIsModalOpen(true)
        }}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Shipment
      </button>

      {isModalOpen && (
        <div
          id="create-shipment-modal"
          role="dialog"
          aria-modal="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create Shipment
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

              <div className="p-4 md:p-5">
                <form onSubmit={onSubmit} className="space-y-4">



                  <div>
                    <label
                      htmlFor="receiver-address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Receiver Address
                    </label>
                    <input
                      id="receiver-address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="0x01..."
                      required
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                    />
                  </div>


                  <div>
                    <label
                      htmlFor="pickup-date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pickup Date
                    </label>
                    <input
                      id="pickup-date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="0x01..."
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>


                  <div>
                    <label
                      htmlFor="distance"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Distance (Km)
                    </label>
                    <input
                      id="distance"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="0"
                      type="number"
                      required
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price-eth"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price (ETH)
                    </label>
                    <input
                      placeholder="0.05"
                      id="price-eth"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={priceEth}
                      onChange={(e) => setPriceEth(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPending || isConfirming}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                 >
                  {isPending?"Submitting...":
                  isConfirming?"Confirming...":
                  isConfirmed?"Submitted":
                  "Create Shipment"}
                  </button>
                  {isError && (
                    <p className="mt-2 text-sm text-red-600">
                      Error: {error?.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}


     {isSuccessModelOpen && (
        <div
          id="success-modal"
          role="dialog"
          aria-modal="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-sm max-h-full">
            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Shipment Created!
                </h3>
                <button
                  onClick={() => {
                    setSuccessModelOpen(false);
                    setTxHash(undefined);
                  }}
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center"
                >
                  <svg
                    className="w-4 h-4"
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

              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p>
                  Your transaction was confirmed!
                </p>
                <p className="mt-2 break-all">
                  <strong>Tx Hash:</strong> {txHash}
                </p>
                <p className="mt-2">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on Sepolia Etherscan
                  </a>
                </p>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => {
                      setSuccessModelOpen(false);
                      setTxHash(undefined);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}