"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, anvil } from "wagmi/chains";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

export default getDefaultConfig({
  appName: "Supply chain",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia, anvil],
  wallets: [{ groupName: "Recommended", wallets: [metaMaskWallet] }],
  ssr: false,
});
