const hre = require("hardhat");

async function main() {
    
    const Tracking = await hre.ethers.getContractFactory("Tracking");

    
    const tracking = await Tracking.deploy();

    
    await tracking.deployed();

    console.log(`Contract deployed to: ${lock.address}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
