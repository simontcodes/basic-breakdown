import type { Metadata } from "next";
import Link from "next/link";
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
    <html lang="en" className={`${quicksand.variable} ${interTight.variable}`}>
      <body className="antialiased">
        <div className="min-h-screen bg-zinc-100 text-zinc-900">
          <div className="mx-auto flex min-h-screen max-w-5xl flex-col border-x border-zinc-300 bg-zinc-50 shadow-md">
            {/* Header (shared) */}
            <header className="flex items-center justify-between px-4 py-5 sm:px-8">
              <Link href="/" className="leading-tight hover:opacity-90 transition">
                <div className="text-2xl font-bold tracking-[0.25em] text-zinc-900">
                  BASIC
                </div>
                <div className="text-2xl font-bold tracking-[0.25em] text-zinc-900">
                  BREAKDOWN
                </div>
              </Link>

              <nav className="flex items-center gap-6 text-xs font-medium tracking-[0.18em] text-zinc-700">
                <Link href="/archive" className="hover:text-zinc-900">
                  ARCHIVE
                </Link>
                <Link href="/about" className="hover:text-zinc-900">
                  ABOUT
                </Link>
              </nav>
            </header>

            {/* Main (page-specific) */}
            <main className="px-4 pb-16 pt-4 sm:px-8 sm:pb-20">{children}</main>

            {/* Footer (shared) */}
            <footer
              id="about"
              className="mt-auto border-t border-zinc-200 px-4 py-6 text-left text-sm text-zinc-700 sm:px-8"
            >
              <p className="max-w-2xl">
                Basic Breakdown is a short-form newsletter that explains one
                important story at a time—what happened, why it matters, and what
                to watch next. Clean, context-rich, and designed to fit into your
                day without taking it over.
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
