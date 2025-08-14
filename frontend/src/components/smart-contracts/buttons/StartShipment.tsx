"use client";

import React, { useState, useEffect } from "react";
import useSupplyChain from "@/hooks/useSupplyChain";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import Spinner from "@/components/Spinner";

interface StartShipmentProps {
  onSuccess: () => void;
}

// Optional: status labels for nicer messages
const STATUS_LABELS = ["PENDING", "IN_TRANSIT", "DELIVERED"] as const;

export default function StartShipment({ onSuccess }: StartShipmentProps) {
  const { address, isConnected } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModelOpen, setSuccessModelOpen] = useState(false);
  const [indexStr, setIndexStr] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [myCount, setMyCount] = useState<number | null>(null);

  // ➜ add getShipment here
  const {
    startShipment,
    getShipment,
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

  // Pull the user's shipment count when modal opens (nice UX/help text)
  useEffect(() => {
    if (!isModalOpen || !isConnected || !address) return;
    getShipmentCount(address)
      .then((n) => setMyCount(n))
      .catch(() => setMyCount(null));
  }, [isModalOpen, isConnected, address, getShipmentCount]);

  useEffect(() => {
    if (isConfirmed && txHash) {
      setSuccessModelOpen(true);
      setIsModalOpen(false);
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

    // --- New: Status pre-check (must be PENDING to start) ---
    try {
      const zeroBasedIndex = id1Based - 1;
      const s = await getShipment(zeroBasedIndex); // expects { status: number, ... }

      if (!s || typeof s.status !== "number") {
        alert("Could not read shipment status. Please try again.");
        return;
      }

      if (s.status !== 0) {
        const label = STATUS_LABELS[s.status] ?? `STATUS_${s.status}`;
        alert(
          `Cannot start this shipment because it is ${label}. Only PENDING shipments can be started.`
        );
        return;
      }

      // Status ok → start
      const hash = await startShipment({ index: zeroBasedIndex });
      setTxHash(hash as `0x${string}`);
    } catch (e: any) {
      console.error(e);
      alert(e?.shortMessage || e?.message || "Failed to start shipment");
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
        Start Shipment
      </button>

      {isModalOpen && (
        <div
          id="start-shipment-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-5 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Start Shipment
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
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="shipment-id"
                    className="block text-sm text-gray-200 mb-1"
                  >
                    Shipment number
                  </label>
                  <input
                    placeholder="e.g. 1"
                    id="shipment-id"
                    type="number"
                    min={1}
                    step={1}
                    className="w-full p-2 rounded bg-gray-50 text-gray-900"
                    required
                    value={indexStr}
                    onChange={(e) => setIndexStr(e.target.value)}
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
                    : "Start Shipment"}
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
                Shipment Started!
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
