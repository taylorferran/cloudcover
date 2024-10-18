// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract CloudCover is FunctionsClient {


    // CHAINLINK SETUP 

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;    
    using FunctionsRequest for FunctionsRequest.Request;

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        string flight_status,
        bytes response,
        bytes err
    );

    address router = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;
    error UnexpectedRequestID(bytes32 requestId);

    // JavaScript source code
    // Fetch flight status
    string source =
        "const flight_iata = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://api.aviationstack.com/v1/flights?access_key=XXXXXXX&flight_iata=${flight_iata}`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data.data[0].flight_status);";

    uint32 gasLimit = 300000;
    bytes32 donID =
        0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;

    string public flight_status;

    // CLOUDCOVER SETUP 

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
        bytes32 requestID;
    }

    mapping(uint256 => InsurancePolicy) public policies;
    mapping(bytes32 => uint256) public policyNumbers;

    uint256 public policyCount;

    constructor(IERC20 _usdcInstance) FunctionsClient(router) {
        usdcInstance = _usdcInstance;
    }

    // Create a new insurance request (traveler)
    function createInsuranceRequest(string calldata flightNumber, uint256 coverageAmount) external {
        uint256 premium = (coverageAmount / 10);

        // check user has enough usdc
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
            paidOut: false,
            requestID: 0x00
        });

        // Transfer the premium to the contract
        bool success = usdcInstance.transferFrom(msg.sender, address(this), premium);
        require(success, "USDC transfer failed");
    }

    function cancelInsuranceRequest(uint256 policyId) external {
        InsurancePolicy storage policy = policies[policyId];

        require(msg.sender == policy.traveler, "Only the traveler can cancel the policy.");
        require(!policy.funded, "Cannot cancel a funded policy.");
        require(!policy.paidOut && !policy.active, "Policy is either already paid out or active.");

        // set to inactive
        policy.active = false;

        // refund premium
        bool success = usdcInstance.transfer(policy.traveler, policy.premium);
        require(success, "Premium refund failed");
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
    function settleInsurance(uint256 policyId, string memory _flightStatus) internal {
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
            // If flight completes, refund the coverage amount + premium to the provider in USDC
            uint256 payoutAmount = policy.coverageAmount + policy.premium;
            bool success = usdcInstance.transfer(policy.provider, payoutAmount);
            require(success, "USDC refund to provider failed");
            policy.paidOut = true;
        } else {
            revert("Flight still active");
        }

        policy.active = false;
    }

    /**
     * @notice Sends an HTTP request for flight info
     * @param subscriptionId The ID for the Chainlink subscription
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendRequest(
        uint64 subscriptionId,
        string[] calldata args,
        uint256 policyId
    ) external returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        policyNumbers[s_lastRequestId] = policyId;

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        flight_status = string(response);
        s_lastError = err;

        settleInsurance(policyNumbers[requestId], flight_status);

        // Emit an event to log the response
        emit Response(requestId, flight_status, s_lastResponse, s_lastError);
    }
        // Fallback to receive any excess ETH
        receive() external payable {}
    }
