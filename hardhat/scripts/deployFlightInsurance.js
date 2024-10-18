const { ethers } = require("hardhat");

async function main() {
    // Deploying the contract

    console.log("Deploying the FlightInsurance contract...");

    const FlightInsurance = await ethers.getContractFactory("FlightInsurance");
    const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // replace with the actual USDC contract address
    const flightInsurance = await FlightInsurance.deploy(usdcAddress);
    await flightInsurance.deployed();

    console.log("FlightInsurance contract deployed to:", flightInsurance.address);
}

// Error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
