"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const transactionHash = searchParams.get("hash");

  return (
    <>
      <p className="mb-4">
        Your flight insurance policy has been successfully created.
      </p>
      {transactionHash && (
        <p className="text-sm break-all">
          Transaction:
          <Link
            className="text-blue-500 hover:underline"
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
          >
            {transactionHash}
          </Link>
        </p>
      )}
    </>
  );
}
