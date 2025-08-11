interface ContractsConfig {
  [chainId: number]: {
    supplychain: string;
  };
}

export const chainToSupplyChain: ContractsConfig = {
  31337: {
    supplychain: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  11155111: {
    supplychain: "0x5eB57Ed9e9e5A4874e41290531b759308F7424fB",
  },
};
