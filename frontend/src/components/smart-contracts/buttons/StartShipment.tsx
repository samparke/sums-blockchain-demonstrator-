"use client";

import React, { useState, useEffect } from "react";
import useSupplyChain from "@/hooks/useSupplyChain";
import { useWaitForTransactionReceipt } from "wagmi";
import Spinner from "@/components/Spinner";

interface StartShipmentProps {
  onSuccess: () => void;
}

export default function StartShipment({ onSuccess }: StartShipmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModelOpen, setSuccessModelOpen] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [indexStr, setIndexStr] = useState("");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { startShipment, isPending, isError, error } = useSupplyChain();

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
      setTxHash(undefined);
      setReceiver("");
      setIndexStr("");

      onSuccess();
    }
  }, [isConfirmed, txHash, onSuccess]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiver.trim() || !indexStr.trim()) {
      alert("Please enter a receiver address and a shipment ID");
      return;
    }

    const indexNum = Number(indexStr);
    if (isNaN(indexNum) || indexNum < 0) {
      alert("Invalid shipment ID. Enter non-negative number");
      return;
    }

    try {
      const tx = await startShipment({
        receiver: receiver.trim(),
        index: indexNum,
      });
      setTxHash(tx);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to start shipment");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setTxHash(undefined);
          setIsModalOpen(true);
        }}
        className="block text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Start Shipment
      </button>

      {isModalOpen && (
        <div
          id="start-shipment-modal"
          role="dialog"
          aria-modal="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-sm bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-white">
                  Start Shipment
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
                      htmlFor="shipment-id"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shipment ID
                    </label>
                    <input
                      placeholder="ID"
                      id="shipment-id"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={indexStr}
                      onChange={(e) => setIndexStr(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPending || isConfirming}
                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {isPending
                      ? "Submitting..."
                      : isConfirming
                      ? "Confirming..."
                      : isConfirmed
                      ? "Submitted..."
                      : "Start Shipment"}
                  </button>
                </form>
              </div>
              {(isPending || isConfirming) && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                  <Spinner size={8} />
                </div>
              )}
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
                  Shipment Started!
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
                <p>Your transaction was confirmed!</p>
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
