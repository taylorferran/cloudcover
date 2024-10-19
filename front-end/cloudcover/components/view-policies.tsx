"use client";

import { useState, useEffect, SetStateAction, use } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverEffect } from "./ui/card-hover-effect";
import { SkeletonCard } from "./ui/skeletonCard";
import { Badge } from "./ui/badge";

const contractABI = [
  {
    inputs: [{ internalType: "uint256", name: "policyId", type: "uint256" }],
    name: "fundInsurance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "policies",
    outputs: [
      { internalType: "uint256", name: "policyNumber", type: "uint256" },
      { internalType: "address payable", name: "traveler", type: "address" },
      { internalType: "address payable", name: "provider", type: "address" },
      { internalType: "uint256", name: "premium", type: "uint256" },
      { internalType: "uint256", name: "coverageAmount", type: "uint256" },
      { internalType: "string", name: "flightNumber", type: "string" },
      { internalType: "bool", name: "funded", type: "bool" },
      { internalType: "bool", name: "active", type: "bool" },
      { internalType: "bool", name: "paidOut", type: "bool" },
      { internalType: "bytes32", name: "requestID", type: "bytes32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "policyCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "subscriptionId", type: "uint64" },
      { internalType: "string[]", name: "args", type: "string[]" },
      { internalType: "uint256", name: "policyId", type: "uint256" },
    ],
    name: "sendRequest",
    outputs: [{ internalType: "bytes32", name: "requestId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractAddress = "0x415B56a8B3B80b914Bb790ACFF979e28b12e1955";

interface InsurancePolicy {
  policyNumber: number;
  traveler: string;
  provider: string;
  premium: string;
  coverageAmount: string;
  flightNumber: string;
  funded: boolean;
  active: boolean;
  paidOut: boolean;
  requestID: string;
}

export function ViewPoliciesComponent() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<InsurancePolicy[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPolicy, setProcessingPolicy] = useState<number | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [showUserPolicies, setShowUserPolicies] = useState(false);

  useEffect(() => {
    fetchPolicies();
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected wallet address:", address);
      setUserAddress(address);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Failed to connect wallet. Please try again.");
    }
  };
  const fetchPolicies = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const policyCount = await contract.policyCount();
      const fetchedPolicies = [];

      for (let i = 1; i <= policyCount; i++) {
        const policy = await contract.policies(i);
        fetchedPolicies.push({
          policyNumber: policy.policyNumber.toNumber(),
          traveler: policy.traveler,
          provider: policy.provider,
          premium: ethers.utils.formatUnits(policy.premium, 6),
          coverageAmount: ethers.utils.formatUnits(policy.coverageAmount, 6),
          flightNumber: policy.flightNumber,
          funded: policy.funded,
          active: policy.active,
          paidOut: policy.paidOut,
          requestID: policy.requestID,
        });
      }

      console.log("Fetched policies:", fetchedPolicies);
      setPolicies(fetchedPolicies);
      setFilteredPolicies(fetchedPolicies);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching policies:", err);
      setError("Failed to fetch policies. Please try again.");
      setLoading(false);
    }
  };

  const handleCoverPolicy = async (policyId: number) => {
    setProcessingPolicy(policyId);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

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
        100000000000
      );
      console.log("Waiting for approval transaction to confirm...");
      await approvalTx.wait();
      console.log("Approval confirmed!");

      const tx = await contract.fundInsurance(policyId);
      await tx.wait();

      await fetchPolicies();
      setProcessingPolicy(null);
    } catch (err) {
      console.error("Error covering policy:", err);
      setError("Failed to cover policy. Please try again.");
      setProcessingPolicy(null);
    }
  };

  const toggleUserPoliciesFilter = () => {
    if (!userAddress) {
      setError("Please connect your wallet first.");
      return;
    }

    setShowUserPolicies(!showUserPolicies);
    if (!showUserPolicies) {
      const userPolicies = policies.filter((policy) => {
        const travelerMatch =
          policy.traveler.toLowerCase() === userAddress.toLowerCase();
        const providerMatch =
          policy.provider.toLowerCase() === userAddress.toLowerCase();
        return travelerMatch || providerMatch;
      });
      setFilteredPolicies(userPolicies);
    } else {
      setFilteredPolicies(policies);
    }
  };

  const handleSettlePolicy = async (policyId: number, flightNumber: string) => {
    setProcessingPolicy(policyId);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.sendRequest(3670, [flightNumber], policyId);
      await tx.wait();

      await fetchPolicies();
      setProcessingPolicy(null);
    } catch (err) {
      console.error("Error settling policy:", err);
      setError("Failed to initiate settlement. Please try again.");
      setProcessingPolicy(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Available Policies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 ">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const policyItems = filteredPolicies.map((policy) => ({
    title: `Flight ${policy.flightNumber}`,
    description: (
      <>
        <p>Coverage Amount: {policy.coverageAmount} USDC</p>
        <p>Premium: {policy.premium} USDC</p>
        <p>
          Status:{" "}
          {policy.funded
            ? "Funded"
            : policy.active
            ? "Active"
            : policy.paidOut
            ? "Paid Out"
            : "Available"}
        </p>
        <p>Traveler: {policy.traveler}</p>
        <p>Provider: {policy.provider}</p>
      </>
    ),
    link: "#",
    id: policy.policyNumber,
    traveler: policy.traveler,
    provider: policy.provider,
    funded: policy.funded,
    active: policy.active,
    paidOut: policy.paidOut,
    flightNumber: policy.flightNumber,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Available Policies</h1>
      <div className="my-4">
        <Button onClick={toggleUserPoliciesFilter}>
          {showUserPolicies ? "Show All Policies" : "Show My Policies"}
        </Button>
      </div>
      {filteredPolicies.length > 0 ? (
        //@ts-ignore
        <HoverEffect items={policyItems} className="w-full">
          {(item) => (
            <div className="p-2">
              {/* <Badge>Type</Badge> */}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <div className="text-sm mb-4">{item.description}</div>
              {userAddress &&
                item.traveler &&
                item.provider &&
                item.traveler.toLowerCase() !== userAddress.toLowerCase() &&
                item.provider.toLowerCase() !== userAddress.toLowerCase() &&
                !item.funded &&
                !item.paidOut && (
                  <Button
                    className="w-full mb-2"
                    onClick={() => handleCoverPolicy(item.id)}
                    disabled={processingPolicy === item.id}
                  >
                    {processingPolicy === item.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Cover This Policy"
                    )}
                  </Button>
                )}
              {userAddress &&
                item.traveler &&
                item.provider &&
                (item.traveler.toLowerCase() === userAddress.toLowerCase() ||
                  item.provider.toLowerCase() === userAddress.toLowerCase()) &&
                item.funded &&
                !item.paidOut && (
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSettlePolicy(item.id, item.flightNumber)
                    }
                    disabled={processingPolicy === item.id}
                  >
                    {processingPolicy === item.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Settle Policy"
                    )}
                  </Button>
                )}
            </div>
          )}
        </HoverEffect>
      ) : (
        <p>No policies found.</p>
      )}
    </div>
  );
}
