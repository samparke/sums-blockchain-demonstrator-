"use client";

import useSupplyChain from "@/hooks/useSupplyChain";
import React, { useState, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

interface CompleteShipmentProps {
  onSuccess: () => void;
}

export default function CompleteShipment({onSuccess} : CompleteShipmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [indexStr, setIndexStr] = useState("");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const {completeShipment, isPending, isError, error} = useSupplyChain();

  const {
    data: receipt,
    isLoading: isConfirming,  
    isSuccess: isConfirmed,    
    isError: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,         
    confirmations: 1,       
  });


  useEffect(() => {
    if (isConfirmed && txHash) {
      alert(
        `Transaction confirmed!\n\nTx Hash: ${txHash}\n\nView on Sepolia:\nhttps://sepolia.etherscan.io/tx/${txHash}`
      );

      setIsModalOpen(false);
      setReceiver("");
      setIndexStr("");
      setTxHash(undefined);

      onSuccess();
    }
  }, [isConfirmed, txHash, onSuccess]);



  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!receiver.trim() || !indexStr.trim()) {
      alert("Please enter both receiver address and shipment ID");
      return;
    }

    const indexNum = Number(indexStr);
    if(isNaN(indexNum) || indexNum < 0) {
      alert("INvalid shipment ID");
      return;
    }

    try {
      const tx = await completeShipment({receiver: receiver.trim(), index:indexNum});
      setTxHash(tx)
    } catch (error:any) {
      console.error(error);
      alert(error.message || "Failed to complete shipment")
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          setTxHash(undefined)
          setIsModalOpen(true)
        }}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Complete Shipment
      </button>

      {isModalOpen && (
        <div
          id="authentication-modal"
          role="dialog"
          aria-modal="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Complete Shipment
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="receiver-address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Receiver Address
                    </label>
                    <input
                      value={receiver}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="0x01..."
                      required
                      onChange={(e) => setReceiver(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="shipment-id"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shipment ID
                    </label>
                    <input
                    value={indexStr}
                      onChange={(e) => setIndexStr(e.target.value)}
                      placeholder="ID"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Complete Shipment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}