// quizQuestions.ts
export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: Question[] = [
  {
    question: "What is a hash in the context of a blockchain?",
    options: [
      "A private key",
      "A unique digital fingerprint of data",
      "A block reward",
    ],
    correctIndex: 1,
    explanation:
      "A hash is a fixed-length fingerprint of data: even a tiny change to the input produces a completely different hash.",
  },
  {
    question: "Why are hashes useful for supply-chain records?",
    options: [
      "They reduce shipping costs",
      "They detect when data has been tampered with",
      "They let companies share a wallet",
    ],
    correctIndex: 1,
    explanation:
      "Because any change to the record would change its hash, making tampering instantly obvious.",
  },
  {
    question: "A blockchain “block” is best described as:",
    options: [
      "A single encrypted invoice",
      "A container that groups many verified transactions",
      "A private server run by one company",
    ],
    correctIndex: 1,
    explanation:
      "Blocks bundle multiple validated transactions together and link to previous blocks, forming the chain.",
  },
  {
    question:
      "What happens when a new block is added to a public blockchain?",
    options: [
      "Earlier blocks can be edited",
      "All previous data becomes invalid",
      "The chain’s history grows and remains tamper-evident",
    ],
    correctIndex: 2,
    explanation:
      "Adding a block extends the chain; past blocks stay unchanged, preserving an immutable history.",
  },
  {
    question:
      "Which feature of blockchain most directly supports product authenticity?",
    options: [
      "Decentralized storage",
      "High electricity use",
      "Random mining rewards",
    ],
    correctIndex: 0,
    explanation:
      "Storing records across many nodes prevents a single party from altering provenance data.",
  },
  {
    question: "A smart contract is essentially:",
    options: [
      "A legal PDF uploaded to the cloud",
      "Self-executing code that runs on the blockchain",
      "A password-protected spreadsheet",
    ],
    correctIndex: 1,
    explanation:
      "Smart contracts are programs that automatically enforce rules when their conditions are met.",
  },
  {
    question:
      "In our simulation, calling “Complete Shipment” triggers which on-chain effect?",
    options: [
      "Deletes the shipment record",
      "Changes status to “Delivered” and records a timestamp",
      "Generates a new crypto token",
    ],
    correctIndex: 1,
    explanation:
      "It updates the shipment’s status to Delivered, logs the time, and can release payment.",
  },
  {
    question: "Why is an immutable blockchain record valuable for audits?",
    options: [
      "Auditors can alter entries faster",
      "Data resides behind a paywall",
      "The history can’t be changed after it’s written",
    ],
    correctIndex: 2,
    explanation:
      "Because once data is on-chain, it cannot be retroactively altered, ensuring trustworthiness.",
  },
  {
    question:
      "Which business benefit is most closely tied to using smart contracts for payments?",
    options: [
      "Automated, condition-based release of funds",
      "Lower import duties",
      "Increased advertising reach",
    ],
    correctIndex: 0,
    explanation:
      "Smart contracts can release payment automatically when delivery conditions are met, reducing delays.",
  },
  {
    question:
      "If IoT sensors push temperature data into a smart contract, the primary advantage is:",
    options: [
      "Cheaper hardware",
      "Real-time, verifiable condition monitoring",
      "Larger block size",
    ],
    correctIndex: 1,
    explanation:
      "Sensors can feed live data on-chain, giving stakeholders instant, tamper-proof visibility of conditions.",
  },
];