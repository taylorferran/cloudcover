"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "./ui/themeToggle";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/app/public/images/CloudCoverLogo.png";

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-950 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex-shrink-0">
                <Link className="flex items-center justify-center" href="/">
                  <Image
                    alt="logo"
                    src={logo}
                    width={32}
                    height={32}
                    priority
                  />
                  <span className="ml-2 text-2xl font-bold text-slate-950 dark:text-white">
                    CloudCover
                  </span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                <Link
                  href="/flights"
                  className="text-slate-950 hover:bg-slate-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  View flights
                </Link>
                <Link
                  href="/create"
                  className="text-slate-950 dark:text-white hover:bg-slate-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Policy
                </Link>
                <Link
                  href="/view"
                  className="text-slate-950 dark:text-white hover:bg-slate-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  View Policies
                </Link>
                <ConnectButton label="Connect wallet" />
                <ModeToggle />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-950 dark:text-white hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                href="/flights"
                className="block text-slate-950 dark:text-white hover:bg-slate-950 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                View flights
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/create"
                className="block text-slate-950 dark:text-white hover:bg-slate-950 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Create Policy
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/view"
                className="block text-slate-950 dark:text-white hover:bg-slate-950 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                View Policies
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5 justify-between">
                <ConnectButton label="Connect wallet" />
                <ModeToggle />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
