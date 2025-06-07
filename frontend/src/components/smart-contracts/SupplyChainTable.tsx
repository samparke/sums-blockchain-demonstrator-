"use client";

import React from "react";
import GetShipment from "./buttons/GetShipment";

interface Shipment {
  sender: string;
  receiver: string;
  pickupTime: number;
  deliveryTime: number;
  distance: number;
  price: string;
  status: number;
  isPaid: boolean;
  txHash: string;
  blockNumber: string;
}

interface SupplyChainTableProps {
  shipments: Shipment[];
}
// UPDATED: shipments is what will be replaced from our RecentShipments data.
export default function SupplyChainTable({ shipments }: SupplyChainTableProps) {
  return (
    <div className="w-full max-w-screen-xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-10">
      <div className="flex items-center justify-between px-8 py-6 bg-gray-50">
        <h2 className="text-2xl font-medium text-gray-800">All Shipments</h2>
        <GetShipment />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Pickup Time</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Blockchain Block #</th>
              <th className="py-3 px-6">Blockchain Transaction</th>
              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Shipment Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y">
            {shipments.map((shipment, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.receiver.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(shipment.pickupTime * 1000).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.distance}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.deliveryTime > 0
                    ? new Date(shipment.deliveryTime * 1000).toLocaleString()
                    : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.blockNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {String(shipment.txHash).slice(0, 15)}…
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.isPaid ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {["PENDING", "IN_TRANSIT", "DELIVERED"][shipment.status]}
                </td>
              </tr>
            ))}

            {shipments.length === 0 && (
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                  colSpan={10}
                >
                  No shipments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}