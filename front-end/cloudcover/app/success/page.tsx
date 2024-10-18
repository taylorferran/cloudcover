"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const transactionHash = searchParams.get("hash");

  return (
    <div className="relative h-[40rem] w-full rounded-md flex flex-col items-center justify-center antialiased">
      {/* Background Beams */}
      <BackgroundBeams />

      {/* Content Section */}
      <div className="relative z-10 max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-600 text-center font-sans font-bold mb-8">
          Transaction Complete
        </h1>
        <div className="container relative mx-auto px-4 py-8 z-10">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                Insurance Policy Created
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
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
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/view">
                <Button>View policy</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
