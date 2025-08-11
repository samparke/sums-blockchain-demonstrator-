// frontend/hooks/useRecentShipments.ts
import { useQuery } from "@tanstack/react-query";
import { gqlClient } from "../../lib/graphql-client";
import { GET_RECENT_SHIPMENTS } from "../../graphql/queries";

// thhis page uses react query to fetch blockchain data from graphql api
// combines events
// converts into one clean list for my table

// this provides the typescript formats to expect when receiving the GET_RECENT_SHIPMENTS

type RecentShipmentsResponse = {
  created: {
    nodes: Array<{
      rindexerId: number;
      sender: string;
      receiver: string;
      distance: string;
      price: string;
      txHash: string;
      blockNumber: string;
    }>;
  };
  started: {
    nodes: Array<{
      rindexerId: number;
      pickupTime: string;
      txHash: string;
      blockNumber: string;
    }>;
  };
  delivered: {
    nodes: Array<{
      rindexerId: number;
      deliveryTime: string;
      txHash: string;
      blockNumber: string;
    }>;
  };
  paid: { nodes: Array<{ rindexerId: number }> };
};

export type Shipment = {
  rindexerId: number;
  sender: string;
  receiver: string;
  pickupTime: number;
  deliveryTime: number;
  distance: number;
  price: string;
  status: 0 | 1 | 2; // 0=CREATED,1=IN_TRANSIT,2=DELIVERED
  isPaid: boolean;
  txHash: string;
  blockNumber: string;
};

// correctly formats timestamp for pickup and delivery times
function normalizeTimestamp(ts?: string): number {
  if (!ts) return 0;
  const asNum = Number(ts);
  if (!isNaN(asNum)) {
    // if it's milliseconds:
    if (asNum > 1e12) return Math.floor(asNum / 1000);
    // else treat as seconds
    return Math.floor(asNum);
  }
  const parsed = Date.parse(ts);
  return isNaN(parsed) ? 0 : Math.floor(parsed / 1000);
}

// if no number is passed, fetch 20 results by default
export function useRecentShipments(limit = 20) {
  return useQuery<Shipment[], Error>({
    // this is the query key
    queryKey: ["recentShipments", limit],
    // this is the query . the data I want (stated in the GET_RECENT_SHIPMENTS) is passed to my gqlClient, which then stores in data variable
    queryFn: async () => {
      const data = await gqlClient.request<RecentShipmentsResponse>(
        GET_RECENT_SHIPMENTS,
        { first: limit }
      );
      const { created, started, delivered, paid } = data;

      // build one shipment per rindexerId
      const map = new Map<number, Shipment>();

      // add the created shipment
      created.nodes.forEach((c) => {
        map.set(c.rindexerId, {
          rindexerId: c.rindexerId,
          sender: c.sender,
          receiver: c.receiver,
          pickupTime: 0,
          deliveryTime: 0,
          distance: parseFloat(c.distance),
          price: c.price,
          status: 0,
          isPaid: false,
          txHash: c.txHash,
          blockNumber: c.blockNumber,
        });
      });

      // bump into intransit
      started.nodes.forEach((s) => {
        const sh = map.get(s.rindexerId);
        if (sh && sh.status < 1) {
          sh.status = 1;
          if (!sh.pickupTime) sh.pickupTime = normalizeTimestamp(s.pickupTime);
          sh.txHash = s.txHash;
          sh.blockNumber = s.blockNumber;
        }
      });

      // bump to delivered
      delivered.nodes.forEach((d) => {
        const sh = map.get(d.rindexerId);
        if (sh) {
          sh.status = 2;
          sh.deliveryTime = normalizeTimestamp(d.deliveryTime);
          sh.txHash = d.txHash;
          sh.blockNumber = d.blockNumber;
        }
      });

      // mark paid
      const paidSet = new Set(paid.nodes.map((p) => p.rindexerId));
      paidSet.forEach((id) => {
        const sh = map.get(id);
        if (sh) sh.isPaid = true;
      });

      // return sorted and sliced
      return Array.from(map.values())
        .sort((a, b) => b.pickupTime - a.pickupTime)
        .slice(0, limit);
    },
    // auto refresh every 30 seconds. could shorten it to 10 seconds if needed.
    refetchInterval: 30_000,
  });
}
