"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "./ui/background-beams";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

// The ABI for the FlightInsurance contract
const contractABI = [
  {
    inputs: [
      { internalType: "string", name: "flightNumber", type: "string" },
      { internalType: "uint256", name: "coverageAmount", type: "uint256" },
    ],
    name: "createInsuranceRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "policyId", type: "uint256" }],
    name: "fundInsurance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "policyId", type: "uint256" },
      { internalType: "string", name: "_flightStatus", type: "string" },
    ],
    name: "settleInsurance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// FlightInsurance contract address
const contractAddress = "0x415B56a8B3B80b914Bb790ACFF979e28b12e1955";

// USDC contract address (replace with actual address)
const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const loadingStates = [
  { text: "Initializing transaction..." },
  { text: "Approving USDC spending..." },
  { text: "Creating insurance request..." },
  { text: "Waiting for transaction to confirm..." },
  { text: "Finalizing policy creation..." },
];

export function CreatePolicyComponent() {
  const [flightNumber, setFlightNumber] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [premium, setPremium] = useState(0);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [currentLoadingState, setCurrentLoadingState] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const initializeEthers = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const network = await provider.getNetwork();

          if (network.name !== "sepolia") {
            setErrorMessage("Please connect to the Sepolia network");
            return;
          }

          const signer = provider.getSigner();
          setSigner(signer);

          const flightInsuranceContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setContract(flightInsuranceContract);
        } catch (error) {
          console.error("Failed to initialize ethers:", error);
          setErrorMessage(
            "Failed to connect to wallet. Please make sure MetaMask is installed and connected."
          );
        }
      } else {
        setErrorMessage("Please install MetaMask!");
      }
    };

    initializeEthers();
  }, []);

  useEffect(() => {
    const calculatePremium = () => {
      if (coverageAmount) {
        const coverageWei = ethers.utils.parseUnits(coverageAmount, 6); // Assuming USDC has 6 decimals
        const premiumWei = coverageWei.div(10);
        setPremium(parseFloat(ethers.utils.formatUnits(premiumWei, 6)));
      } else {
        setPremium(0);
      }
    };

    calculatePremium();
  }, [coverageAmount]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!contract || !signer) {
      setErrorMessage("Contract or signer not initialized");
      return;
    }

    setLoading(true);
    setShowLoader(true);
    setCurrentLoadingState(0);
    setErrorMessage("");

    try {
      const coverageWei = ethers.utils.parseUnits(coverageAmount, 6);
      const premiumWei = coverageWei.div(10);

      // Approve USDC transfer
      setCurrentLoadingState(1);

      const usdcContract = new ethers.Contract(
        usdcAddress,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
        ],
        signer
      );

      console.log("Approving USDC spending...");
      const approvalTx = await usdcContract.approve(
        contractAddress,
        premiumWei
      );
      console.log("Waiting for approval transaction to confirm...");
      await approvalTx.wait();
      console.log("Approval confirmed!");

      // Create insurance request
      console.log("Creating insurance request...");
      setCurrentLoadingState(2);
      const transactionResponse = await contract.createInsuranceRequest(
        flightNumber,
        coverageWei
      );
      console.log("Waiting for transaction to confirm...");
      setCurrentLoadingState(3);

      const receipt = await transactionResponse.wait();
      setCurrentLoadingState(4);
      toast.success("Insurance request created successfully.");

      // Navigate to success page with transaction hash
      router.push(`/success?hash=${receipt.transactionHash}`);

      console.log(
        "Insurance request created successfully:",
        receipt.transactionHash
      );
    } catch (error) {
      console.error("Error creating policy:", error);
      setErrorMessage(`Error creating policy: ${(error as Error).message}`);
      setShowLoader(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Beams */}
      <BackgroundBeams />

      {/* Content Section */}
      <div className="relative z-10 max-w-xl w-full space-y-8">
        <h1 className="relative text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 dark:from-white to-neutral-600 dark:to-neutral-300 text-center font-sans font-bold">
          Create Flight Insurance Policy
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Secure your travel with blockchain-powered flight insurance on
          Sepolia.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Policy Details</CardTitle>
            <CardDescription>
              Enter your flight details to get instant coverage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label htmlFor="flightNumber">Flight Number</Label>
                <Input
                  id="flightNumber"
                  placeholder="e.g. FL12345"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coverageAmount">Coverage Amount (USDC)</Label>
                <Input
                  id="coverageAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  required
                  min="0"
                  step="0.000001"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="mb-4 text-lg font-semibold">
              You pay: {Number(premium).toFixed(6)} USDC
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !!errorMessage}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Processing..." : "Create Policy"}
            </Button>
            {showLoader && (
              <div className="mt-4 w-full">
                <Loader
                  loadingStates={loadingStates}
                  loading={showLoader}
                  value={currentLoadingState}
                />
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
