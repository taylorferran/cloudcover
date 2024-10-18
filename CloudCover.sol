// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Define the IERC20 interface
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

interface IFlightStatusOracle {
    function getFlightStatus() external view returns (string memory flightStatus);
}

contract FlightInsurance {
    address public oracleAddress;
    IFlightStatusOracle private oracle;
    IERC20 public usdcInstance;

    struct InsurancePolicy {
        uint256 policyNumber;
        address payable traveler;
        address payable provider;
        uint256 premium;
        uint256 coverageAmount;
        string flightNumber;
        bool funded;
        bool active;
        bool paidOut;
    }

    mapping(uint256 => InsurancePolicy) public policies;
    uint256 public policyCount;

    constructor(address _oracleAddress, IERC20 _usdcInstance) {
        oracleAddress = _oracleAddress;
        oracle = IFlightStatusOracle(oracleAddress);
        usdcInstance = _usdcInstance;
    }

    // Function to create a new insurance request (traveler)
    function createInsuranceRequest(string calldata flightNumber, uint256 coverageAmount) external {
        uint256 premium = (coverageAmount / 10);

        // Check if the user has approved enough USDC for the contract to use
        uint256 allowance = usdcInstance.allowance(msg.sender, address(this));
        require(allowance >= premium, "USDC allowance is not enough, please approve first.");

        policyCount++;

        policies[policyCount] = InsurancePolicy({
            policyNumber: policyCount,
            traveler: payable(msg.sender),
            provider: payable(address(0)),
            premium: premium,
            coverageAmount: coverageAmount,
            flightNumber: flightNumber,
            funded: false,
            active: false,
            paidOut: false
        });

        //policyArray.push(policies[policyCount]);

        // Transfer the premium to the contract
        bool success = usdcInstance.transferFrom(msg.sender, address(this), premium);
        require(success, "USDC transfer failed");
    }


    // Function for the investor to fund the insurance request using USDC
    function fundInsurance(uint256 policyId) external {
        InsurancePolicy storage policy = policies[policyId];

        require(!policy.funded, "Insurance is already funded");
        require(policy.traveler != msg.sender, "Traveler cannot fund their own insurance");

        // Check if the provider has approved enough USDC for the contract to use
        uint256 allowance = usdcInstance.allowance(msg.sender, address(this));
        require(allowance >= policy.coverageAmount, "USDC allowance is not enough, please approve first.");

        // Transfer the USDC from the provider to the contract
        bool success = usdcInstance.transferFrom(msg.sender, address(this), policy.coverageAmount);
        require(success, "USDC transfer failed");

        // Update the policy
        policy.provider = payable(msg.sender);
        policy.funded = true;
        policy.active = true;
    }

    // Function to settle the insurance claim based on the oracle's flight status, using USDC
    function settleInsurance(uint256 policyId, string memory _flightStatus) external {
        InsurancePolicy storage policy = policies[policyId];

        require(policy.active, "Insurance is not active");
        require(!policy.paidOut, "Insurance has already been settled");

        bool isCancelled;
        bool isComplete;

        if (keccak256(abi.encodePacked(_flightStatus)) == keccak256(abi.encodePacked("cancelled"))) {
            isCancelled = true;
        } else if (keccak256(abi.encodePacked(_flightStatus)) == keccak256(abi.encodePacked("landed"))) {
            isComplete = true;
        }

        if (isCancelled) {
            // If flight is cancelled, payout the coverage amount + premium to the traveler in USDC
            uint256 payoutAmount = policy.coverageAmount + policy.premium;
            bool success = usdcInstance.transfer(policy.traveler, payoutAmount);
            require(success, "USDC transfer to traveler failed");
            policy.paidOut = true;
        } else if (isComplete) {
            // If flight completes, refund the premium to the provider in USDC
            bool success = usdcInstance.transfer(policy.provider, policy.premium);
            require(success, "USDC refund to provider failed");
            policy.paidOut = true;
        } else {
            revert("Flight still active");
        }

        policy.active = false;
    }


        // Fallback to receive any excess ETH
        receive() external payable {}
    }
