// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");
    const Tracking = await hre.ethers.getContractFactory("Tracking");
    console.log("Contract factory obtained...");
    const tracking = await Tracking.deploy();
    console.log("Deployment transaction sent...");
    await tracking.waitForDeployment(); // Correct way to wait for deployment
    console.log("Contract deployed to:", await tracking.getAddress()); // Correct way to get the contract address
    console.log("Deployment complete.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment error:", error);
        process.exit(1);
    });