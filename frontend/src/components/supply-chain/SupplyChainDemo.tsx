"use client"

import {AiOutlineFileAdd} from "react-icons/ai"
import { AiOutlineTruck } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi";
import SupplyChainTable from "./SupplyChainTable";
import { chainToSupplyChain } from "@/app/constants/constants";
import { supplyChainAbi } from "@/app/constants/abi/supplyChain";
import { useAccount, useChainId, useConfig, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";

export default function SupplyChainDemo() {

  const account = useAccount();
  const chainId = useChainId();
  const config = useConfig();
  const {data: hash, isPending, error, writeContractAsync} = useWriteContract()
  const {isLoading: isConfirming, isSuccess: isConfirmed, isError} = useWaitForTransactionReceipt({
    confirmations:1, 
    hash,
  })
  const supplyAddress = chainToSupplyChain[chainId]["supplychain"]


  const createShipment  = async (items) => {
    console.log(items);
    const {receiver, pickupTime, distance, price} = items;
    
    await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "createShipment",
      args: [receiver, new Date(pickupTime).getTime(), distance, 1] 
    })
  }


  const getAllShipment = async () => {
    const shipments = await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getAllTransactions",
    })
    const allShipments = shipments.map((shipment) => ({
      sender: shipment.sender as string,
      receiver: shipment.receiver as string,
      price: shipment.price as string,
      pickupTime: shipment.pickupTime as number,
      deliveryTime: shipment.deliveryTime as number,
      distance: shipment.distance as number,
      isPaid: shipment.isPaid as boolean,
      status: shipment.status,
    }))

    return allShipments
  }


  const getShipmentCount = async () => {
    const shipmentCount = await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getShipmentCount",
      args:[account.address],
    })
    return shipmentCount as number;
  }


  const completeShipment = async (completeShip) => {
    const {receiver, index} = completeShip
    const transaction = await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "completeShipment",
      args: [account.address, receiver, index],
    })
  }

  const getShipment = async (index) => {
    const shipment = await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getShipment",
      args:[account.address, index * 1];
    })
    console.log(shipment);

    const singleShipment = {
      sender: shipment[0],
      receiver: shipment[1],
      pickupTime: shipment[2].toNumber(),
      deliveryTime: shipment[3].toNumber(),
      distance: shipment[4].toNumber(),
      price: ethers.utils.formatEther(shipment[5]),
      status: shipment[6],
      isPaid: shipment[7],
    }
    return singleShipment;
  }

  const startShipment = async (getProduct) => {
    const {retreiver, index} = getProduct;

    const shipment = await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "startShipment",
      args: [account.address, retreiver, index*1]
    })
  }

  return (
    <div className="py-10 px-20 flex flex-col items-center space-y-10">
      <div className="flex flex-col justify-center items-center w-full max-w-7xl mx-auto bg-zinc-50 rounded-xl p-20">
        <h1 className="text-3xl font-bold text-gray-800 pb-10">
          Demo
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
        <button className="w-64 bg-red-100 rounded-md text-center py-5 border border-red-200 hover:bg-red-200 transition duration-150 cursor-pointer">
          <div className="flex flex-col justify-center items-center space-y-2">
            <AiOutlineFileAdd className="text-4xl text-red-800" />
            <span className="font-sans">Create Shipment</span>
          </div>
        </button>

        <button className="w-64 bg-blue-100 rounded-md text-center py-5 border border-blue-200 hover:bg-blue-200 transition duration-150 cursor-pointer">
          <div className="flex flex-col justify-center items-center space-y-2">
            <AiOutlineTruck className="text-4xl text-blue-800" />
            <span>Start Shipment</span>
          </div>
        </button>

        <button className="w-64 bg-green-100 rounded-md text-center py-5 border border-green-200 hover:bg-green-200 transition duration-150 cursor-pointer">
          <div className="flex flex-col justify-center items-center space-y-2">
            <HiOutlineShieldCheck className="text-4xl text-green-800" />
            <span>Complete Shipment</span>
          </div>
        </button>
        <SupplyChainTable/>
      </div>
    </div>
    </div>

  );
}