"use client"

import { chainToSupplyChain } from "@/app/constants/constants";
import { supplyChainAbi } from "@/app/constants/abi/supplyChain";
import { useAccount, useChainId, useConfig, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { readContract } from "@wagmi/core";
import {formatEther, parseEther} from "viem";

export default function useSupplyChain() {

  const {address, isConnected} = useAccount();
  const chainId = useChainId();
  const config = useConfig();
  const {data: txHash, isPending, error, writeContractAsync} = useWriteContract()
  const {isLoading: isConfirming, isSuccess: isConfirmed, isError} = useWaitForTransactionReceipt({
    confirmations:1, 
    hash:txHash,
  })
  const supplyAddress = chainToSupplyChain[chainId]["supplychain"]


    // create, start and complete shipment - writing to contract

  const createShipment  = async ({
    receiver,
    pickupTime,
    distance,
    priceEtherString
  } : {
    receiver: string;
    pickupTime: string;
    distance: number;
    priceEtherString: string;
  }) => {
    if (!isConnected) throw new Error("Connect wallet first")
    const priceWei = parseEther(priceEtherString); 
    
    await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "createShipment",
      args: [receiver,
            Number(pickupTime),
            distance,
            priceWei,],
            value: priceWei, 
    });
  }

  const startShipment = async ({
    receiver, index
    } : {
        receiver:string;
        index: number;
    }) => {
    if(!isConnected) throw new Error ("Connect wallet first")
    await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "startShipment",
      args: [address, receiver, index]
    })
  }


  const completeShipment = async ({
    receiver,
    index,
  } : {
    receiver: string;
    index: number;
  }) => {
    if (!isConnected) throw new Error ("Connect wallet first");
      await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "completeShipment",
      args: [address, receiver, index],
    })
  }





  // retreiving shipments - reading contract

  const getAllShipment = async () => {
    const shipments: any[] = (await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getAllTransactions",
    })) as any[];

    return shipments.map((shipment) => ({
      sender: shipment.sender as string,
      receiver: shipment.receiver as string,
      price: formatEther(shipment.price),
      pickupTime: Number(shipment.pickupTime),
      deliveryTime: Number(shipment.deliveryTime),
      distance: Number(shipment.distance),
      isPaid: shipment.isPaid as boolean,
      status: shipment.status as number,
    }))
  }


  const getShipmentCount = async () => {
    if (!isConnected) return 0;
    const shipmentCount = await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getShipmentCount",
      args:[address],
    })
    return Number(shipmentCount);
  }


  const getShipment = async (index: number) => {
    if (!isConnected) throw new Error("Connect wallet first");
    const shipment: any[] = (await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getShipment",
      args:[address, index],
    })) as any[];
    return {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: Number(shipment[2]),
        deliveryTime: Number(shipment[3]),
        distance: Number(shipment[4]),
        price: formatEther(shipment[5]),
        status: shipment[6] as number,
        isPaid: shipment[7] as boolean,
    }
}

    return {
        createShipment,
        getAllShipment,
        getShipmentCount,
        getShipment,
        startShipment,
        completeShipment,
        isPending,
        isConfirming,
        isConfirmed,
        isError,
        error,
      }
}
