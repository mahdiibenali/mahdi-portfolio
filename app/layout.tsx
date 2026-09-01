import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahdi Ben Ali — Full-Stack Developer",
  description:
    "Full-Stack Developer crafting high-performance digital experiences. Specializing in modern web applications, API architecture, and creative development.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Mahdi Ben Ali",
    "Tunisia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mahdi Ben Ali — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting high-performance digital experiences.",
    type: "website",
    siteName: "Mahdi Ben Ali",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahdi Ben Ali — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting high-performance digital experiences.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} no-gsap`}>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
