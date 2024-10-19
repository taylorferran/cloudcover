"use client";

import { Button } from "@/components/ui/button";
import {
  Coins,
  DollarSign,
  Plane,
  Search,
  Shield,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import FeaturesSectionDemo from "@/components/blocks/features-section-demo-2";

export function HomepageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundGradientAnimation className="h-auto">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight px-60 sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Decentralized Peer-to-Peer Flight Insurance on Ethereum
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
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
      </BackgroundGradientAnimation>

      <main className="flex-1">
        <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
          <div className="px-4 md:px-6 container mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-left mb-4">
              About
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-left">
              CloudCover is revolutionizing the traditional flight insurance
              model with transparency, speed, and decentralized technology. By
              leveraging Ethereum smart contracts, decentralized oracles, and
              stablecoins, CloudCover ensures that travelers get paid instantly
              when their flight is canceled, without the hassle of traditional
              insurance companies.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-left mt-2">
              Travelers request flight insurance by locking in a small premium.
              Investors, in turn, fund these policies by locking up a coverage
              amount, earning the premium if the flight lands as scheduled. If a
              flight is canceled, the traveler receives an automatic payout.
            </p>
          </div>
        </section>
        <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            {/* Travelers Section */}
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-4">
              Travelers
            </h3>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Smartphone className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">1. Request Insurance</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Enter your flight details, select coverage, and pay a premium
                  through our app.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Shield className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">2. Get Covered</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  If an investor funds your policy, you&apos;re covered
                  instantly. No middlemen, no delays.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Plane className="h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold">3. Automatic Payout</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  If your flight is canceled, receive an instant payout to your
                  crypto wallet via smart contract.
                </p>
              </div>
            </div>

            {/* Investors Section */}
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-4 mt-12">
              Investors
            </h3>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Search className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">1. Browse Policies</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Explore available insurance requests and choose flights to
                  insure.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <DollarSign className="h-12 w-12 text-purple-500" />
                <h3 className="text-xl font-bold">2. Fund Insurance</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Fund policies for flights you believe will land on time and
                  earn premium profits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Coins className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">3. Earn Returns</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  If the flight lands as scheduled, the premium is paid to you
                  as profit. If it&apos;s canceled, the traveler gets the
                  payout.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Features
          </h2>
          <FeaturesSectionDemo />
        </section>
      </main>
    </div>
  );
}
