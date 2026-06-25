import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Talks 2026",
  description: "Register to be part of the next Evolutionary Tech Talks in the Big 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <nav className="border-b px-6 py-3 flex gap-6 text-sm font-semibold tracking-tight">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/talks" className="hover:text-orange-500 transition-colors">Talks</Link>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}