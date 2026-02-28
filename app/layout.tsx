import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StellarSpend — Financial Freedom on the Blockchain",
  description:
    "StellarSpend helps the unbanked and underbanked track spending, manage budgets, and build savings using the low-cost Stellar blockchain. No bank account required.",
  keywords: ["stellar", "blockchain", "budgeting", "finance", "XLM", "USDC", "unbanked"],
  openGraph: {
    title: "StellarSpend — Financial Freedom on the Blockchain",
    description:
      "Track spending, manage budgets, and build savings on the Stellar network.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
