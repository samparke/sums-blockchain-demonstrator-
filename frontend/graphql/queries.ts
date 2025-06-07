import { gql } from 'graphql-request';

// this page defined graphql query and fetches data from rindexter. This can be created in the sandbox (where you custom create queries)


// this query "GetRecentShipments" contains bundles my three needed queries into one.
// created: AllShipmentCreateds, started: allShipmentsInTransits, delivered: allShipmentsDelivereds, and paid: allShipmentPaids
// within each first = from the begining, and orderedBy gets the most recent rindexer id (latest transaction)
// then it contains the nodes I want to fetch and show in my frontend. 
// this is then exported under 'GET_RECENT_SHIPMENTS' and is imported by my hook page 'useRecentShipments.ts'

export const GET_RECENT_SHIPMENTS = gql`
  query GetRecentShipments(
    $first: Int = 20
  ) {
    created: allShipmentCreateds(
      first: $first
      orderBy: [RINDEXER_ID_DESC]
    ) {
      nodes {
        rindexerId
        sender
        receiver
        pickupTime
        distance
        price
        txHash
        blockNumber
      }
    }
    started: allShipmentInTransits(
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
    delivered: allShipmentDelivereds(
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
    paid: allShipmentPaids(
      first: $first
      orderBy: [RINDEXER_ID_DESC]
    ) {
      nodes {
        rindexerId
      }
    }
  }
`;