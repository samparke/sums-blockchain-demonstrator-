"use client"

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
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Sender</th>
                <th className="py-3 px-6">Recevier</th>
                <th className="py-3 px-6">PickupTime</th>
                <th className="py-3 px-6">Distance</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Delivery Time</th>
                <th className="py-3 px-6">Paid</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    sender
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    receiver
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Pick up time
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Price
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Delivery time
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    isPaid?
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Shipment status
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  