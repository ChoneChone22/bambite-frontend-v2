import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_Thai_Looped,
  DM_Sans,
  Space_Mono,
  Stick_No_Bills,
  Indie_Flower,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavbarV2 from "@/components/NavbarV2";
import NavbarMobile from "@/components/NavbarMobile";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import CartSidebar from "@/components/CartSidebar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  variable: "--font-noto-sans-thai-looped",
  weight: "500",
  subsets: ["thai", "latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: "500",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: "700",
  subsets: ["latin"],
});

const stickNoBills = Stick_No_Bills({
  variable: "--font-stick-no-bills",
  weight: "400",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const chillaxSemibold = localFont({
  src: "../fonts/Chillax-Semibold.woff2",
  variable: "--font-chillax-semibold",
  weight: "600",
  display: "swap",
});

const postNoBillsColombo = localFont({
  src: "../fonts/postnobillscolombo-semibold.ttf",
  variable: "--font-postnobills-colombo",
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BamBite - Authentic Asian Food in Thailand",
    template: "%s | BamBite",
  },
  description:
    "We're a fast-moving team that strives to offer the best Asian food in Thailand. Quality, dedication, and velocity.",
  keywords: [
    "Asian food",
    "Thai food",
    "BamBite",
    "restaurant",
    "food delivery",
  ],
  authors: [{ name: "BamBite" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bambite.com",
    siteName: "BamBite",
    title: "BamBite - Authentic Asian Food in Thailand",
    description:
      "We're a fast-moving team that strives to offer the best Asian food in Thailand.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BamBite - Authentic Asian Food in Thailand",
    description:
      "We're a fast-moving team that strives to offer the best Asian food in Thailand.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansThaiLooped.variable} ${dmSans.variable} ${spaceMono.variable} ${stickNoBills.variable} ${indieFlower.variable} ${chillaxSemibold.variable} ${postNoBillsColombo.variable} antialiased overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <CartProvider>
            {/* Mobile Navbar - shown on screens smaller than md (768px) */}
            <div className="md:hidden">
              <NavbarMobile />
            </div>

            {/* Desktop Navbar - shown on screens md (768px) and larger */}
            <div className="hidden md:block">
              <NavbarV2 />
            </div>

            {children}
            <Footer />
            <CartSidebar />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
