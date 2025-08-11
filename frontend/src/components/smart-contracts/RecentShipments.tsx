"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import React, { useState, useMemo } from "react";
import SupplyChainTable from "./SupplyChainTable";
import {
  useRecentShipments,
  Shipment as RawShipment,
} from "@/hooks/useRecentShipments";

// this page calls my hook (which receives now contains the data from graphql), and correctly formats it to place into my supply chain table

interface TableShipment {
  sender: string;
  receiver: string;
  pickupTime: number;
  deliveryTime: number;
  distance: number;
  price: string;
  status: number;
  isPaid: boolean;
  blockNumber: string;
  txHash: string;
}

export default function RecentShipments({ limit = 20 }: { limit?: number }) {
  // from the useRecentShipment hook, passing in our 20 limit
  const {
    data: raw,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useRecentShipments(limit);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const shipments: TableShipment[] = React.useMemo(() => {
    if (!raw) return [];

    return raw.map((s: RawShipment) => ({
      sender: s.sender,
      receiver: s.receiver,
      pickupTime: s.pickupTime,
      deliveryTime: s.deliveryTime,
      distance: s.distance,
      price: s.price,
      status: s.status,
      isPaid: s.isPaid,
      blockNumber: s.blockNumber,
      txHash: s.txHash,
    }));
  }, [raw]);

  const totalPages = Math.ceil(shipments.length / pageSize);
  const allShipments = useMemo(
    () => shipments.slice((page - 1) * pageSize, page * pageSize),
    [shipments, page]
  );

  if (isLoading) {
    return (
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-zinc-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-zinc-100" />
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-zinc-100" />
      </div>
    );
  }
  if (isError) {
    return (
      <div
        role="alert"
        className="mt-6 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm"
      >
        <div className="flex items-start gap-4 p-5">
          <div className="mt-0.5 rounded-full bg-amber-100 p-2">
            <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900">
              Live shipment data unavailable
            </h3>

            <p className="mt-1 text-sm text-amber-800/90">
              The live shipment table isn’t available right now (it only runs
              during class demos). You can still create, start, and complete
              shipments, and view all transactions on Sepolia Etherscan:{" "}
              <a
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                href="https://sepolia.etherscan.io/address/0x5eB57Ed9e9e5A4874e41290531b759308F7424fB"
                target="_blank"
                rel="noopener noreferrer"
              >
                view contract
              </a>
              .
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                  aria-hidden
                />
                {isFetching ? "Retrying…" : "Retry"}
              </button>

              {error?.message && (
                <span className="text-xs text-amber-800/70">
                  ({error.message})
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200" />
      </div>
    );
  }

  // returns the pre made supply chain table i made for the previous version, inputting the live fetched and formatted values instead
  return (
    <div>
      <SupplyChainTable shipments={allShipments} />

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            ← Prev
          </button>

          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
