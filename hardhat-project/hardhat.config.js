require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-gas-reporter");

const BNBT_PRIVATE_KEY = process.env.BNBT_PRIVATE_KEY;
const BNBT_RPC_URL = process.env.BNBT_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  // networks: {
  //   bnbt: {
  //     url: BNBT_RPC_URL,
  //     accounts: [BNBT_PRIVATE_KEY],
  //     chainId: 97,
  //   },
  // },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY,
  // },
  gasReporter: {
    enabled: true,
    outputFile: "gasreporter.txt",
    noColors: true,
  },
  coverage: {
    exclude: ["test/", "node_modules/"],
  },
  solidity: "0.8.19",
};
