import type { Metadata } from "next";
import { Quicksand, Inter_Tight } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.basicbreakdown.com"),
  title: "Basic Breakdown",
  description: "News, simplified.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Basic Breakdown",
    title: "Basic Breakdown",
    description: "News, simplified.",
    images: [
      {
        url: "/basic-breakdown-og.png",
        width: 1200,
        height: 630,
        alt: "Basic Breakdown — clean news explainer layout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basic Breakdown — News that actually makes sense",
    description: "News, simplified.",
    images: ["/basic-breakdown-og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${interTight.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
