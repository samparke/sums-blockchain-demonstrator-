"use client";

import React, { useState, useEffect } from "react";
import { parseEther } from "viem";
import useSupplyChain from "@/hooks/useSupplyChain";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import Spinner from "@/components/Spinner";

interface CreateShipmentProps {
  onSuccess: () => void;
}

export default function CreateShipment({ onSuccess }: CreateShipmentProps) {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModelOpen, setSuccessModelOpen] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [priceEth, setPriceEth] = useState("");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [shipmentCount, setShipmentCount] = useState<number>();

  const { createShipment, getShipmentCount, isPending, isError, error } =
    useSupplyChain();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
      confirmations: 1,
    });

  useEffect(() => {
    if (isConfirmed && txHash && isConnected && address) {
      getShipmentCount(address)
        .then((count) => setShipmentCount(count - 1))
        .catch(() => setShipmentCount(undefined))
        .finally(() => {
          setSuccessModelOpen(true);
          setIsModalOpen(false);
          setReceiver("");
          setPickupDate("");
          setDistance(0);
          setPriceEth("");

          onSuccess();
        });
    }
  }, [isConfirmed, txHash, getShipmentCount, onSuccess, isConnected, address]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiver.trim() || !pickupDate || distance <= 0 || !priceEth.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    const pickupTimeUnix = Math.floor(new Date(pickupDate).getTime() / 1000);

    let priceWei: bigint;
    try {
      priceWei = parseEther(priceEth);
    } catch {
      alert("Invalid price. Use something like 0.05");
      return;
    }

    try {
      const tx = await createShipment({
        pickupTime: pickupTimeUnix.toString(),
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
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Transaction failed");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="block text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Create Shipment
      </button>

      {isModalOpen && (
        <div
          id="create-shipment-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Create Shipment
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
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
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="pickup-date"
                    className="block mb-1 text-sm text-gray-200"
                  >
                    Pickup Date
                  </label>
                  <input
                    id="pickup-date"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="distance"
                    className="block mb-1 text-sm text-gray-200"
                  >
                    Distance (Km)
                  </label>
                  <input
                    id="distance"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    type="number"
                    required
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label
                    htmlFor="price-eth"
                    className="block mb-1 text-sm text-gray-200"
                  >
                    Price (ETH)
                  </label>
                  <input
                    placeholder="0.05"
                    id="price-eth"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    required
                    value={priceEth}
                    onChange={(e) => setPriceEth(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending || isConfirming}
                  className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
                >
                  {isPending
                    ? "Submitting..."
                    : isConfirming
                    ? "Confirming..."
                    : isConfirmed
                    ? "Submitted"
                    : "Create Shipment"}
                </button>
                {isError && (
                  <p className="text-sm text-red-400">
                    Error: {error?.message}
                  </p>
                )}
              </form>
            </div>
            {(isPending || isConfirming) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg">
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Shipment Created!</h3>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <p>Your transaction was confirmed!</p>
              <p className="break-all">
                <strong>Tx Hash:</strong> {txHash}
              </p>
              {shipmentCount !== undefined && (
                <p>
                  <strong>Shipment ID:</strong> {shipmentCount}
                </p>
              )}
              <p>
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
                    setShipmentCount(undefined);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
