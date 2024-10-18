import React from "react";
import Link from "next/link";
import { Cloud } from "lucide-react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function NavBar() {
  return (
    <>
      <Link className="flex items-center justify-center" href="/">
        <Cloud className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">CloudCover</span>
      </Link>
      <nav className="ml-auto flex gap-4 items-center sm:gap-6">
        <div className="flex gap-4 px-6">
          <ConnectButton label="Connect wallet" />
        </div>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/view"
        >
          View Policies
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/create"
        >
          Create Policy
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Profile
        </Link>
      </nav>
    </>
  );
}
