"use client";

import useSupplyChain from "@/hooks/useSupplyChain";
import React, { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import Spinner from "@/components/Spinner";

interface CompleteShipmentProps {
  onSuccess: () => void;
}

export default function CompleteShipment({ onSuccess }: CompleteShipmentProps) {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModelOpen, setSuccessModelOpen] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [indexStr, setIndexStr] = useState("");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { completeShipment, isPending, isError, error, getShipmentCount } =
    useSupplyChain();

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

      setIsModalOpen(false);
      setSuccessModelOpen(true);
      setReceiver("");
      setIndexStr("");
      setTxHash(undefined);

      onSuccess();
    }
  }, [isConfirmed, txHash, onSuccess]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiver.trim() || !indexStr.trim()) {
      alert("Please enter both receiver address and shipment ID");
      return;
    }

    const indexNum = Number(indexStr);
    if (isNaN(indexNum) || indexNum < 0) {
      alert("INvalid shipment ID");
      return;
    }

    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const count = await getShipmentCount(address);
      if (indexNum >= count) {
        alert(
          `Invalid shipment ID. You only have ${count} shipments. Remember, your first shipment ID starts at zero.`
        );
        return;
      }
    } catch (err) {
      alert("Failed to validate shipment ID");
      console.error(err);
      return;
    }

    try {
      const tx = await completeShipment({
        receiver: receiver.trim(),
        index: indexNum,
      });
      setTxHash(tx);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to complete shipment");
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
        Complete Shipment
      </button>

      {isModalOpen && (
        <div
          id="authentication-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-5 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Complete Shipment
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="text-gray-400 hover:text-white"
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
              <form className="space-y-4 text-gray-200" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="receiver-address"
                    className="block mb-1 text-sm"
                  >
                    Receiver Address
                  </label>
                  <input
                    value={receiver}
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    placeholder="0x01..."
                    required
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="shipment-id" className="block mb-1 text-sm">
                    Shipment ID
                  </label>
                  <input
                    value={indexStr}
                    onChange={(e) => setIndexStr(e.target.value)}
                    placeholder="e.g. 0"
                    type="number"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
                >
                  Complete Shipment
                </button>
                {isError && (
                  <p className="text-sm text-red-400 mt-2">{error?.message}</p>
                )}
              </form>
            </div>
            {(isPending || isConfirming) && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                <Spinner size={8} />
              </div>
            )}
          </div>
        </div>
      )}

      {isSuccessModelOpen && (
        <div
          id="success-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Shipment complete!
                </h3>
                <button
                  onClick={() => {
                    setSuccessModelOpen(false);
                    setTxHash(undefined);
                  }}
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
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

              <div className="text-sm text-gray-700 space-y-2">
                <p>Your shipment was created!</p>
                <p className="break-all">
                  <strong>Tx Hash:</strong> {txHash}
                </p>
                <p className="mt-2">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
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
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
