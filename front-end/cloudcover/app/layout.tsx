import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import NavBar from "@/components/navBar";
import { ContextProvider } from "./contextProvider";
import Footer from "@/components/footer";
import { Toaster, toast } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CloudCover",
  description: "Decentralized Flight Insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ContextProvider>
            {/* Your App */}
            <header className="container mx-auto px-4 lg:px-6 h-14 flex items-center">
              <NavBar />
            </header>
            <main className="flex-1">{children}</main>
            {/* {children} */}
            <Footer />
          </ContextProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
