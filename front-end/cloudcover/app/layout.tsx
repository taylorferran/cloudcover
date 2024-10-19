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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='white'>☁</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
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
            <header className="h-16 flex items-center">
              <NavBar />
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </ContextProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
