"use client";

import { Button } from "@/components/ui/button";
import { Plane, Shield, Smartphone } from "lucide-react";
import Link from "next/link";

export function HomepageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Decentralized Flight Insurance
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Protect your travels with blockchain-powered insurance. Get
                  instant coverage and automatic payouts for flight delays and
                  cancellations.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Covered</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Smartphone className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">1. Request Coverage</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Enter your flight details in our app and select your desired
                  coverage amount.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Shield className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">
                  2. Smart Contract Activation
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Your coverage is secured on the blockchain through a smart
                  contract.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Plane className="h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold">3. Automatic Payout</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  If your flight is delayed or cancelled, receive an instant
                  payout to your crypto wallet.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
