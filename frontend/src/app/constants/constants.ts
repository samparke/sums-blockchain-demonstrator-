interface ContractsConfig {
    [chainId: number]: {
        supplychain: string
    }
}

export const chainToSupplyChain: ContractsConfig = {
    31337: {
        supplychain: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    },
    11155111: {
        supplychain: "0x30d87467245dff0c1bf37ee345736d9bfa5a03bf"
    },
}
