"use client";

import { useState, useEffect, SetStateAction } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverEffect } from "./ui/card-hover-effect";
import { SkeletonCard } from "./ui/skeletonCard";

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
];

const contractAddress = "0x415B56a8B3B80b914Bb790ACFF979e28b12e1955";

export function ViewPoliciesComponent() {
  const [policies, setPolicies] = useState<
    {
      id: number;
      flightNumber: string;
      costToCover: string;
      premium: string;
      funded: boolean;
      active: boolean;
      paidOut: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPolicy, setProcessingPolicy] = useState<number | null>(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

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
        if (!policy.funded && !policy.active && !policy.paidOut) {
          fetchedPolicies.push({
            id: policy.policyNumber.toNumber(),
            flightNumber: policy.flightNumber,
            costToCover: ethers.utils.formatUnits(policy.coverageAmount, 6), // Assuming USDC with 6 decimals
            premium: ethers.utils.formatUnits(policy.premium, 6),
            funded: policy.funded,
            active: policy.active,
            paidOut: policy.paidOut,
          });
        }
      }

      setPolicies(fetchedPolicies);
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

      // You might want to add USDC approval here if not done elsewhere
      const tx = await contract.fundInsurance(policyId);
      await tx.wait();

      // Refresh policies after successful funding
      await fetchPolicies();
      setProcessingPolicy(null);
    } catch (err) {
      console.error("Error covering policy:", err);
      setError("Failed to cover policy. Please try again.");
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

  const policyItems = policies.map((policy) => ({
    title: `Flight ${policy.flightNumber}`,
    description: (
      <>
        <p>Cost to Cover: {policy.costToCover} USDC</p>
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
      </>
    ),
    link: "#",
    id: policy.id,
    disabled:
      processingPolicy === policy.id ||
      policy.funded ||
      policy.active ||
      policy.paidOut,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Available Policies</h1>
      <HoverEffect items={policyItems} className="w-full">
        {(item) => (
          <div className="p-2">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <div className="text-sm mb-4">{item.description}</div>
            <Button
              className="w-full"
              onClick={() => handleCoverPolicy(item.id)}
              disabled={item.disabled}
            >
              {processingPolicy === item.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : item.disabled ? (
                "Not Available"
              ) : (
                "Cover This Policy"
              )}
            </Button>
          </div>
        )}
      </HoverEffect>
    </div>
  );
}
