// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Define the IERC20 interface
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

// Simplified Oracle interface to check flight status
interface IFlightStatusOracle {
    function getFlightStatus(string calldata flightNumber) external view returns (bool isCancelled);
}

contract CloudCover {
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
    InsurancePolicy[] public policyArray;
    uint256 public policyCount;

    constructor(address _oracleAddress, IERC20 _usdcInstance) {
        oracleAddress = _oracleAddress;
        oracle = IFlightStatusOracle(oracleAddress);
        usdcInstance = _usdcInstance;
    }

// create insurance request
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

        policyArray.push(policies[policyCount]);

        // Transfer the premium to the contract
        bool success = usdcInstance.transferFrom(msg.sender, address(this), premium);
        require(success, "USDC transfer failed");
    }

    // fund policy 
    function fundInsurance(uint256 policyId) external {
        InsurancePolicy storage policy = policies[policyId];

        require(!policy.funded, "Insurance already funded");
        require(policy.traveler != msg.sender, "Traveler cannot fund their own insurance");

        policy.provider = payable(msg.sender);
        policy.funded = true;
        policy.active = true;

        bool success = usdcInstance.transferFrom(msg.sender, address(this), policy.coverageAmount);
        require(success, "USDC transfer failed");
    }

    // settle payment 
    function settleInsurance(uint256 policyId) external {
        InsurancePolicy storage policy = policies[policyId];

        require(policy.active, "Insurance is not active");
        require(!policy.paidOut, "Insurance has already been settled");

        // Call the oracle to check flight status
        bool isCancelled = oracle.getFlightStatus(policy.flightNumber);

        if (isCancelled) {
            // If flight is cancelled, payout the coverage amount to the traveler
            bool success = usdcInstance.transfer(policy.traveler, policy.coverageAmount + policy.premium);
            require(success, "Payout to traveler failed");
            policy.paidOut = true;
        } else {
            // If flight is not cancelled, refund the premium to the provider
            bool success = usdcInstance.transfer(policy.provider, policy.premium);
            require(success, "Refund to provider failed");
            policy.paidOut = true;
        }

        policy.active = false;
    }

    // Fallback to receive any excess ETH
    receive() external payable {}
}
