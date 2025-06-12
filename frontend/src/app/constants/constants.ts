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
        supplychain: "0x3B89F54C2246d9da2C9248dea0a9b95b424F13A6"
    },
}
