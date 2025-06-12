"use client"

import { chainToSupplyChain } from "@/app/constants/constants";
import { supplyChainAbi } from "@/app/constants/abi/supplyChain";
import { useAccount, useChainId, useConfig, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
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
    pickupTime,
    distance,
    priceEtherString
  } : {
    pickupTime: string;
    distance: number;
    priceEtherString: string;
  }) => {
    if (!isConnected) throw new Error("Connect wallet first")
    const priceWei = parseEther(priceEtherString); 
    
      const tx = await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "createShipment",
      args: [
            Number(pickupTime),
            distance,
            priceWei,],
            value: priceWei, 
    });
    return tx;
  }

  const startShipment = async ({
    index,
    } : {
        index: number;
    }) => {
    if(!isConnected) throw new Error ("Connect wallet first")
      const tx = await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "startShipment",
      args: [index]
    })
    return tx;
  }


  const completeShipment = async ({
    index,
  } : {
    index: number;
  }) => {
    if (!isConnected) throw new Error ("Connect wallet first");
      const tx = await writeContractAsync({
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "completeShipment",
      args: [index],
    })
    return tx;
  }

  const getShipment = async (index: number) => {
    if (!isConnected) throw new Error("Connect wallet first");
    const shipment: any[] = (await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress as `0x${string}`,
      functionName: "getShipment",
      args:[index],
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

    const getShipmentCount = async (userAddress?:string):Promise<number> => {
      if (!isConnected) {
        throw new Error("Connect wallet first")
      }
      const count = await readContract(config, {
        abi: supplyChainAbi,
        address: supplyAddress as `0x${string}`,
        functionName: "getShipmentCount",
        args: [userAddress],
      })
      return Number(count);
    }
    

    return {
        createShipment,
        getShipment,
        getShipmentCount,
        startShipment,
        completeShipment,
        isPending,
        isConfirming,
        isConfirmed,
        isError,
        error,
      }
}