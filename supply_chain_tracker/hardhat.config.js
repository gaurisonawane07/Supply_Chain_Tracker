require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const { SEPOLIA_URL, PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};