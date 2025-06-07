"use client"

import React, { useEffect, useState } from "react"
import SupplyChainTimeline from "./SupplyChainTimeline"
import useSupplyChain from "@/hooks/useSupplyChain"
import RecentShipments from "./RecentShipments"

interface Shipment {
    sender: string;
    receiver: string;
    pickupTime: number;
    deliveryTime: number;
    distance: number;
    price: string;
    status: number;
    isPaid: boolean;
    txHash? : string;
  }

export default function SupplyChainDashboard() {
    const {getAllShipment} = useSupplyChain();

    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const fetchShipments = async () => {
        setLoading(true);
        setFetchError("");
        try {
            const all = await getAllShipment();
            setShipments(all)
        } catch (error: any) {
            console.error(error);
            setFetchError(error.message || "Failed to fetch shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, [])

    const handleSuccess = async () => {
        await fetchShipments();
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 pb-10">
          <SupplyChainTimeline onSuccess={handleSuccess} />  
          {fetchError && (
            <p className="my-4 text-sm text-red-600">Error: {fetchError}</p>
          )}
          {loading && <p className="my-4 text-sm text-gray-600">Loading…</p>}
          <RecentShipments limit={20}/>
        </div>
      );
}