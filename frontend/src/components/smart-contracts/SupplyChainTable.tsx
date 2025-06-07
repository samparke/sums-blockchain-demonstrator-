"use client";

import React from "react";
import GetShipment from "./buttons/GetShipment";
import InfoPopover from "./InfoPopover";
import { formatEther } from "viem";

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
    <div className="w-full mx-auto max-w-screen-xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-10">
      <div className="flex items-center justify-between px-8 py-6 bg-gray-50">
        <h2 className="text-2xl font-medium text-gray-800">All Shipments</h2>
        <GetShipment />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              
            <th className="py-3 px-6">
              <div className="flex items-center">
                <span>Sender</span>
                <InfoPopover title="Sender">
                  The blockchain address that initiated this shipment - your wallet address.
                </InfoPopover>
              </div>
            </th>

            <th className="py-3 px-6">
              <div className="flex items-center">
                <span>Receiver</span>
                <InfoPopover title="Receiver">
                  The blockchain address that received the shipment - the receiver address you input.
                </InfoPopover>
              </div>
            </th>
              <th className="py-3 px-6">Pickup Time</th>
              <th className="py-3 px-6">Distance</th>


              <th className="py-3 px-6">
              <div className="flex items-center">
                <span>Price</span>
                <InfoPopover title="Price">
                  The price you set - this is priced in ETH (Ether).
                </InfoPopover>
              </div>
            </th>

              <th className="py-3 px-6">Delivery Time</th>

              <th className="py-3 px-6">
              <div className="flex items-center">
                <span>Block #</span>
                <InfoPopover title="Block #">
                  The block your transaction was confirmed within - this is for the sepolia testnet chain.
                </InfoPopover>
              </div>
            </th>

            <th className="py-3 px-6">
              <div className="flex items-center">
                <span>Blockchain Transaction</span>
                <InfoPopover title="Blockchain Transaction">
                  The blockchain transaction hash - it is clickable to view it on the public sepolia testnet chain.
                </InfoPopover>
              </div>
            </th>


              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Shipment Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y">
            {shipments.length>0?shipments.map((shipment, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`https://sepolia.etherscan.io/address/${shipment.sender}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {shipment.sender.slice(0, 15)}…
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`https://sepolia.etherscan.io/address/${shipment.receiver}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {shipment.receiver.slice(0, 15)}…
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(shipment.pickupTime * 1000).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.distance} KM</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatEther(BigInt(shipment.price))} ETH</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.deliveryTime > 0
                    ? new Date(shipment.deliveryTime * 1000).toLocaleString()
                    : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`https://sepolia.etherscan.io/block/${shipment.blockNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {shipment.blockNumber}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${shipment.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {shipment.txHash.slice(0, 15)}…
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.isPaid ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {["PENDING", "IN_TRANSIT", "DELIVERED"][shipment.status]}
                </td>
              </tr>
            )): (
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                  colSpan={10}    // ← span all 10 columns
                >
                  No shipments found.
                </td>
              </tr>
            )
          }
        </tbody>
        </table>
      </div>
    </div>
  );
}