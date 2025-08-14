"use client";

import useSupplyChain from "@/hooks/useSupplyChain";
import React, { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import Spinner from "@/components/Spinner";

interface CompleteShipmentProps {
  onSuccess: () => void;
}

// For nicer messages
const STATUS_LABELS = ["PENDING", "IN_TRANSIT", "DELIVERED"] as const;

export default function CompleteShipment({ onSuccess }: CompleteShipmentProps) {
  const { address, isConnected } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModelOpen, setSuccessModelOpen] = useState(false);
  const [indexStr, setIndexStr] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [myCount, setMyCount] = useState<number | null>(null);

  const {
    completeShipment,
    getShipment, // ⬅️ bring in getShipment for the pre-check
    isPending,
    isError,
    error,
    getShipmentCount,
  } = useSupplyChain();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
      confirmations: 1,
    });

  useEffect(() => {
    if (!isModalOpen || !isConnected || !address) return;
    getShipmentCount(address)
      .then((n) => setMyCount(n))
      .catch(() => setMyCount(null));
  }, [isModalOpen, isConnected, address, getShipmentCount]);

  useEffect(() => {
    if (isConfirmed && txHash) {
      setIsModalOpen(false);
      setSuccessModelOpen(true);
      setIndexStr("");
      onSuccess();
    }
  }, [isConfirmed, txHash, onSuccess]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    const id1Based = parseInt(indexStr, 10);
    if (!indexStr.trim() || Number.isNaN(id1Based) || id1Based < 1) {
      alert("Invalid shipment number. Enter 1 or higher.");
      return;
    }

    try {
      const count = await getShipmentCount(address);
      if (count <= 0) {
        alert("You don't have any shipments yet.");
        return;
      }
      if (id1Based > count) {
        alert(`Invalid shipment number. Enter between 1 and ${count}.`);
        return;
      }
    } catch (err) {
      alert("Failed to validate shipment number");
      console.error(err);
      return;
    }

    // --- Status pre-check: must be IN_TRANSIT (1) to complete ---
    try {
      const zeroBasedIndex = id1Based - 1;
      const s = await getShipment(zeroBasedIndex);
      if (!s || typeof s.status !== "number") {
        alert("Could not read shipment status. Please try again.");
        return;
      }

      if (s.status !== 1) {
        const label = STATUS_LABELS[s.status] ?? `STATUS_${s.status}`;
        alert(
          `Cannot complete this shipment because it is ${label}. Only IN_TRANSIT shipments can be completed.`
        );
        return;
      }

      // Status OK → complete
      const hash = await completeShipment({ index: zeroBasedIndex });
      setTxHash(hash as `0x${string}`);
    } catch (e: any) {
      console.error(e);
      alert(
        e?.shortMessage ||
          e?.message ||
          "Failed to complete shipment (is it IN_TRANSIT and not already paid?)"
      );
    }
  };

  const submitDisabled =
    isPending || isConfirming || (myCount !== null && myCount === 0);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="block text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Complete Shipment
      </button>

      {isModalOpen && (
        <div
          id="complete-shipment-modal"
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

            <div className="p-4 md:p-5 text-gray-200">
              {myCount !== null && (
                <p className="text-sm mb-3">
                  {myCount > 0 ? (
                    <>
                      You currently have <b>{myCount}</b> shipment
                      {myCount === 1 ? "" : "s"} (numbers are <b>1…{myCount}</b>
                      ).
                    </>
                  ) : (
                    <>You don’t have any shipments yet.</>
                  )}
                </p>
              )}
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="shipment-id" className="block mb-1 text-sm">
                    Shipment number
                  </label>
                  <input
                    value={indexStr}
                    onChange={(e) => setIndexStr(e.target.value)}
                    placeholder="e.g. 1"
                    type="number"
                    min={1}
                    step={1}
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    required
                    disabled={myCount === 0}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-800"
                >
                  {isPending
                    ? "Submitting..."
                    : isConfirming
                    ? "Confirming..."
                    : isConfirmed
                    ? "Submitted..."
                    : "Complete Shipment"}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">
                Shipment Completed!
              </h3>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <p>Your transaction was confirmed.</p>
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
      )}
    </div>
  );
}
