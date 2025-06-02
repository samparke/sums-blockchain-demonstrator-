"use client"

import GetShipment from "./buttons/GetShipment";

export default function SupplyChainTable() {
    // const converTime = (time) => {
    //   const newTime = new Date(time);
    //   const dataTime = new Intl.DateTimeFormat("en-US", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //   }).format(newTime);
  
    //   return dataTime;
    // };
  
    // console.log(allShipmentsdata);

  
    return (
      <div className="max-w-screen-xl mx-auto">
        {/* Header section: title on the left, buttons on the right */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">All Shipments</h2>
          <div className="flex space-x-2">
            <GetShipment/>
            {/* <GetShipment/> */}
          </div>
        </div>
    
        {/* Table container */}
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
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">sender</td>
                <td className="px-6 py-4 whitespace-nowrap">receiver</td>
                <td className="px-6 py-4 whitespace-nowrap">Pick up time</td>
                <td className="px-6 py-4 whitespace-nowrap">Km</td>
                <td className="px-6 py-4 whitespace-nowrap">Price</td>
                <td className="px-6 py-4 whitespace-nowrap">Delivery time</td>
                <td className="px-6 py-4 whitespace-nowrap">isPaid?</td>
                <td className="px-6 py-4 whitespace-nowrap">Shipment status</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  