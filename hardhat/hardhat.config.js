require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://ethereum-sepolia.blockpi.network/v1/rpc/public	`, // Replace with your Infura Project ID
      accounts: [`0x0`], // Replace with your wallet private key
    },
  },
  etherscan: {
    apiKey: "0x0" // Replace with your Etherscan API key
  }
};
