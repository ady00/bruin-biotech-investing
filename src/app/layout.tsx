import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bruin Biotech Investing | UCLA",
  description:
    "UCLA's premier life sciences investment club. Bridging science and capital through stock pitches, investment research, and industry-focused discussions.",
  keywords: [
    "UCLA",
    "biotech",
    "investing",
    "life sciences",
    "student club",
    "investment banking",
    "healthcare",
  ],
  authors: [{ name: "Bruin Biotech Investing" }],
  openGraph: {
    title: "Bruin Biotech Investing | UCLA",
    description:
      "UCLA's premier life sciences investment club. Bridging science and capital.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
