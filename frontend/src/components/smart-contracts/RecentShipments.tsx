"use client";

import React from "react";
import SupplyChainTable from "./SupplyChainTable";
import { useRecentShipments, Shipment as RawShipment } from "@/hooks/useRecentShipments";

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
  const { data: raw, isLoading, isError, error } = useRecentShipments(limit);

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

  if (isLoading) {
    return <p className="text-gray-500">Loading recent shipments…</p>;
  }
  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  // returns the pre made supply chain table i made for the previous version, inputting the live fetched and formatted values instead
  return <SupplyChainTable shipments={shipments} />;
}