// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request';


// my graphQL client API end point. This sets up the connection, like a phone line
export const gqlClient = new GraphQLClient('http://localhost:3001/graphql'); 