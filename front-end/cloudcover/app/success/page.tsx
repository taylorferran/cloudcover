import { Suspense } from "react";
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
import dynamic from "next/dynamic";

const SearchParamsHandler = dynamic(() => import("./searchHandler"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="relative h-[40rem] w-full rounded-md flex flex-col items-center justify-center antialiased">
      {/* Background Beams */}
      <BackgroundBeams />

      {/* Content Section */}
      <div className="relative z-10 max-w-2xl mx-auto p-4">
        <h1 className="relative text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 dark:from-white to-neutral-600 dark:to-neutral-300 text-center font-sans font-bold">
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
              <Suspense fallback={<p>Loading transaction details...</p>}>
                <SearchParamsHandler />
              </Suspense>
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
