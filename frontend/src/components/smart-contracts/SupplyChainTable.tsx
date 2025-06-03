"use client"

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
}

interface SupplyChainTableProps {
  shipments: Shipment[];
}

export default function SupplyChainTable({shipments} : SupplyChainTableProps) {
    return (
      <div>
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-800">All Shipments</h3>
        <GetShipment />
      </div>

      <div className="shadow-sm border rounded-lg overflow-x-auto">
      <table className="w-full table-auto text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="py-3 px-6">Sender</th>
            <th className="py-3 px-6">Receiver</th>
            <th className="py-3 px-6">Pickup Time</th>
            <th className="py-3 px-6">Distance</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Delivery Time</th>
            <th className="py-3 px-6">Paid</th>
            <th className="py-3 px-6">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 divide-y">
          {shipments.map((sh, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">{sh.sender.slice(0,15)}...</td>
              <td className="px-6 py-4 whitespace-nowrap">{sh.receiver.slice(0,15)}...</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(sh.pickupTime * 1000).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{sh.distance}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sh.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {sh.deliveryTime > 0
                  ? new Date(sh.deliveryTime * 1000).toLocaleString()
                  : "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {sh.isPaid ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {["PENDING", "IN_TRANSIT", "DELIVERED"][sh.status]}
              </td>
            </tr>
          ))}

          {shipments.length === 0 && (
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap text-center"
                colSpan={8}
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