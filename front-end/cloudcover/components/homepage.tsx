"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
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
        <div className="relative isolate pt-14">
          <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:gap-x-10 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Decentralized Peer-to-Peer Flight Insurance on Ethereum
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-200">
                Protect your travels with blockchain-powered insurance. Get
                instant coverage and automatic payouts for flight delays and
                cancellations.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href="/create-policy">
                  <Button className="font-semibold">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="mt-16 mb-6 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
              <svg
                role="img"
                viewBox="0 0 366 729"
                className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
              >
                <title>App screenshot</title>
                <defs>
                  <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                    <rect rx={36} width={316} height={684} />
                  </clipPath>
                </defs>
                <path
                  d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                  fill="#4B5563"
                />
                <path
                  d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                  fill="#343E4E"
                />
                <foreignObject
                  width={316}
                  height={684}
                  clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                  transform="translate(24 24)"
                >
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/component-images/mobile-app-screenshot.png"
                  />
                </foreignObject>
              </svg>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              About us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              CloudCover is revolutionizing the traditional flight insurance
              model with transparency, speed, and decentralized technology. By
              leveraging Ethereum smart contracts, decentralized oracles, and
              stablecoins, CloudCover ensures that travelers get paid instantly
              when their flight is canceled, without the hassle of traditional
              insurance companies.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
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
