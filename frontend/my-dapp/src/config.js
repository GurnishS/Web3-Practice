// src/config.js

export const StringStorageABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_string",
        type: "string",
      },
    ],
    name: "setString",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const StringStorageAddress =
  "0x50eba50cfc211E590687d18cA5cd52780904e5e6"; // Replace with your deployed contract address

// module.exports = { StringStorageABI, StringStorageAddress };
