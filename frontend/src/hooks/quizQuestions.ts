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
    question: "What links one block to the next in a blockchain?",
    options: [
      "A digital signature",
      "The hash of the previous block",
      "A timestamp",
    ],
    correctIndex: 1,
    explanation:
      "Each block contains the hash of its predecessor. If someone tampers with an earlier block, its hash changes and breaks the chain.",
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
      "Which of the following is NOT true about blockchain??",
    options: [
      "It always offers complete privacy for transaction details",
      "It provides an immutable ledger of transactions",
      "It can be public or permissioned (private)",
    ],
    correctIndex: 0,
    explanation:
      "Public blockchains are transparent by design—anyone can view transaction data. Privacy requires additional layers (e.g., permissioned chains or zk-proofs).",
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
      "What is a “permissioned” blockchain?",
    options: [
      "A blockchain where anyone can join and validate transactions",
      "A private network where only authorized participants can read or write",
      "A blockchain that requires a license fee to use",
    ],
    correctIndex: 1,
    explanation:
      "In a permissioned blockchain, an organization controls who can access the network and what actions they can perform. Walmart and IBM are examples of businesses which use permissioned blockchains",
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