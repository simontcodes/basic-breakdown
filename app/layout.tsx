import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Basic Breakdown",
  description: "News, simplified.",
  openGraph: {
    type: "website",
    url: "https://basicbreakdown.com",
    title: "Basic Breakdown",
    description:
      "News, simplified.",
    images: [
      {
        url: "https://basicbreakdown.com/basic-breakdown-og.png",
        width: 1200,
        height: 630,
        alt: "Basic Breakdown — clean news explainer layout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basic Breakdown — News that actually makes sense",
    description:
      "News, simplified.",
    images: ["https://basicbreakdown.com/basic-breakdown-og.png"],
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
        {children}
      </body>
    </html>
  );
}
