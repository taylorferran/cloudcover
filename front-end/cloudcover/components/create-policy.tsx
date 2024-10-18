"use client";

import { useState } from "react";
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

export function CreatePolicyComponent() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightCost, setFlightCost] = useState("");
  const premium = flightCost ? Number(flightCost) * 0.1 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to an API
    console.log(
      "Policy created for flight:",
      flightNumber,
      "with cost:",
      flightCost
    );
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-50 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-600  text-center font-sans font-bold">
          Create policy
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          sagittis elit ex. Pellentesque aliquet enim ac nisi tristique, nec
          ornare orci varius.
        </p>
        <div className="container relative mx-auto px-4 py-8 z-50">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Create Flight Insurance Policy</CardTitle>
              <CardDescription>
                Enter your flight details to get instant coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="flightNumber">Flight Number</Label>
                    <Input
                      id="flightNumber"
                      placeholder="e.g. AA1234"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="flightCost">Cost of Flight</Label>
                    <Input
                      id="flightCost"
                      type="number"
                      placeholder="Enter amount"
                      value={flightCost}
                      onChange={(e) => setFlightCost(e.target.value)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="mb-4 text-lg font-semibold">
                You will pay: ${premium.toFixed(2)}
              </div>
              <Button type="submit" onClick={handleSubmit}>
                Create Policy
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
