---

# CloudCover

### Decentralized, Peer-to-Peer Flight Insurance on Ethereum

CloudCover is a decentralized platform that allows users to buy and fund flight insurance policies, leveraging the power of Ethereum smart contracts and decentralized oracles. With CloudCover, travelers can secure immediate, trustless insurance for their flights, while investors can earn premiums by funding policies and betting on flight outcomes in a gamified insurance market.

---

## Table of Contents

- [About](#about)
- [How It Works](#how-it-works)
- [Features](#features)
- [Getting Started](#getting-started)
- [Smart Contract Details](#smart-contract-details)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## About

CloudCover is revolutionizing the traditional flight insurance model with transparency, speed, and decentralized technology. By leveraging Ethereum smart contracts, decentralized oracles, and stablecoins, CloudCover ensures that travelers get paid instantly when their flight is canceled, without the hassle of traditional insurance companies.

Travelers request flight insurance by locking in a small premium. Investors, in turn, fund these policies by locking up a coverage amount, earning the premium if the flight lands as scheduled. If a flight is canceled, the traveler receives an automatic payout.

---

## How It Works

### For Travelers:
1. **Request Insurance**: Enter your flight details, coverage amount, and pay a premium.
2. **Get Covered**: If an investor funds your policy, you're covered. If the flight gets canceled, you'll receive an instant payout.
3. **Automated Payout**: If the flight is canceled, you get paid automatically via smart contracts. No claims, no paperwork.

### For Investors:
1. **Browse Policies**: Browse available insurance requests and choose which flights you want to insure.
2. **Fund Insurance**: Fund the coverage for flights you believe will land on time and earn premiums.
3. **Earn Returns**: If the flight lands as scheduled, the premium is paid to you as profit. If it's canceled, the traveler receives the payout.

---

## Features

- **Peer-to-Peer Flight Insurance**: Connect travelers seeking flight insurance with investors willing to fund policies.
- **Smart Contract-Powered**: Automated payouts, no middlemen, no delays.
- **Real-Time Flight Tracking**: Decentralized oracles track flight statuses in real-time to trigger payouts instantly.
- **Gamified Investment**: Investors can "bet" on flight outcomes, earning premiums by taking on flight insurance risks.
- **Transparency and Security**: All transactions and policy data are visible and secure on the Ethereum blockchain.

---

## Getting Started

### Prerequisites

To run CloudCover locally or participate in the platform, you need:

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) or other Web3-enabled browser extension
- An Ethereum testnet or mainnet connection (via Infura, Alchemy, or other providers)
- A wallet funded with Sepolia ETH and Sepolia USDC (https://faucet.circle.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/taylorferran/CloudCover.git
    ```

2. **Install dependencies**:

    ```bash
    cd front-end
    npm install
    ```

5. **Run the frontend**:

    ```bash
    npm start
    ```

---

## Smart Contract Details

### Main Contract: `CloudCover.sol`

This contract handles the following:

- **Creating Insurance Requests**: Travelers can create an insurance request with flight details, coverage amount, and premium.
- **Funding Insurance**: Investors fund insurance policies and lock up the coverage amount.
- **Oracle Integration**: Decentralized oracles track real-time flight statuses to determine payouts.
- **Automatic Payouts**: If a flight is canceled, the traveler gets paid automatically, while the investor earns the premium if the flight lands as scheduled.

### Oracle Integration
CloudCover uses decentralized oracles (e.g., Chainlink, iExec) to track real-time flight status. The flight status is fed into the smart contract, which triggers automatic payouts based on the oracle's data.

### Stablecoin Integration
All transactions are done using **USDC** to provide price stability. The smart contract interacts with the ERC-20 USDC token standard for premiums, coverage, and payouts.

---

## Technologies Used

- **Solidity**: Smart contract development on Ethereum.
- **React**: Frontend framework for building the CloudCover user interface.
- **Ethers.js**: To interact with the Ethereum blockchain from the frontend.
- **Remix**: Ethereum development environment to write and deploy the smart contract.
- **Blocksense**: Decentralized oracles for real-time flight data.
---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**CloudCover** - Decentralizing flight insurance for a transparent, automated, and gamified experience. Powered by Ethereum, secured by smart contracts, and governed by the community.

---

This README provides a detailed overview of CloudCover's vision, how the system operates, and the technical requirements for developers looking to contribute or deploy the platform locally.
