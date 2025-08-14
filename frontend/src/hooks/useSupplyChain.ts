"use client";

import { chainToSupplyChain } from "@/app/constants/constants";
import { supplyChainAbi } from "@/app/constants/abi/supplyChain";
import {
  useAccount,
  useChainId,
  useConfig,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { readContract, simulateContract } from "@wagmi/core";
import { formatEther, parseEther } from "viem";

export default function useSupplyChain() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const config = useConfig();

  const {
    data: txHash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash: txHash,
  });

  // Resolve contract address for current chain
  const supplyAddress = chainToSupplyChain[chainId]?.["supplychain"] as
    | `0x${string}`
    | undefined;

  function requireReady() {
    if (!supplyAddress) throw new Error("Unsupported chain or missing address");
    if (!isConnected) throw new Error("Connect wallet first");
    if (!address) throw new Error("Missing account");
  }

  // createShipment(distance, price) payable
  const createShipment = async ({
    distance,
    priceEtherString,
  }: {
    distance: number;
    priceEtherString: string;
  }) => {
    requireReady();
    const priceWei = parseEther(priceEtherString);

    // Dry-run first (catches reverts & prepares the exact request)
    const { request } = await simulateContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress!,
      functionName: "createShipment",
      args: [BigInt(distance), priceWei],
      account: address!,
      value: priceWei,
      chainId,
    });

    // Send the exact same request
    const tx = await writeContractAsync(request);
    return tx; // hash
  };

  // startShipment(index)
  const startShipment = async ({ index }: { index: number }) => {
    requireReady();

    const { request } = await simulateContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress!,
      functionName: "startShipment",
      args: [BigInt(index)],
      account: address!,
      chainId,
    });

    const tx = await writeContractAsync(request);
    return tx;
  };

  // completeShipment(index)
  const completeShipment = async ({ index }: { index: number }) => {
    requireReady();

    const { request } = await simulateContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress!,
      functionName: "completeShipment",
      args: [BigInt(index)],
      account: address!,
      chainId,
    });

    const tx = await writeContractAsync(request);
    return tx;
  };

  // getShipment(receiver, index)
  const getShipment = async (index: number, receiver?: `0x${string}`) => {
    if (!isConnected) throw new Error("Connect wallet first");
    if (!supplyAddress) throw new Error("Unsupported chain or missing address");

    const who = receiver ?? (address as `0x${string}`);

    const shipment = (await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress,
      functionName: "getShipment",
      args: [who, BigInt(index)],
    })) as any[];

    return {
      sender: shipment[0] as `0x${string}`,
      receiver: shipment[1] as `0x${string}`,
      pickupTime: Number(shipment[2]),
      deliveryTime: Number(shipment[3]),
      distance: Number(shipment[4]),
      price: formatEther(shipment[5]), // human-friendly string
      status: Number(shipment[6]) as number, // enum index
      isPaid: Boolean(shipment[7]),
    };
  };

  // getShipmentCount(receiver)
  const getShipmentCount = async (receiver?: string): Promise<number> => {
    if (!isConnected) throw new Error("Connect wallet first");
    if (!supplyAddress) throw new Error("Unsupported chain or missing address");

    const who = (receiver as `0x${string}`) ?? (address as `0x${string}`);

    const count = await readContract(config, {
      abi: supplyChainAbi,
      address: supplyAddress,
      functionName: "getShipmentCount",
      args: [who],
    });

    return Number(count);
  };

  return {
    createShipment,
    startShipment,
    completeShipment,
    getShipment,
    getShipmentCount,
    // tx state
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    error,
  };
}
