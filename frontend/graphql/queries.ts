// graphql/queries.ts
import { gql } from "graphql-request";

export const GET_RECENT_SHIPMENTS = gql`
  query GetRecentShipments($first: Int = 20) {
    created: allSupplyChainShipmentCreateds(
      first: $first
      orderBy: [RINDEXER_ID_DESC]
    ) {
      nodes {
        rindexerId
        sender
        receiver
        distance
        price
        txHash
        blockNumber
      }
    }
    started: allSupplyChainShipmentInTransits(
      first: $first
      orderBy: [RINDEXER_ID_DESC]
    ) {
      nodes {
        rindexerId
        pickupTime
        txHash
        blockNumber
      }
    }
    delivered: allSupplyChainShipmentDelivereds(
      first: $first
      orderBy: [RINDEXER_ID_DESC]
    ) {
      nodes {
        rindexerId
        deliveryTime
        txHash
        blockNumber
      }
    }
    paid: allSupplyChainShipmentPaids(
      first: $first
      orderBy: [RINDEXER_ID_DESC]
    ) {
      nodes {
        rindexerId
      }
    }
  }
`;
