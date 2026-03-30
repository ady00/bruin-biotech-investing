import type { Metadata } from "next";
import { Marcellus, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
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
  icons: {
    icon: "/BBI_logo.jpg",
    apple: "/BBI_logo.jpg",
  },
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
      className={`${sourceSans.variable} ${marcellus.variable}`}
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
