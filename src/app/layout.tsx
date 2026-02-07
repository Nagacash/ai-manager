import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title:
    "Maurice Holda | Naga Codex - Certified AI Manager & Web Design Portfolio",
  description:
    "Maurice Holda is a Certified AI Manager and web design expert at Naga Codex. Specializing in AI automation, intelligent systems, web design, cybersecurity, and full-stack development. Based in Hamburg, Germany.",
  keywords: [
    "Maurice Holda",
    "Naga Codex",
    "AI Manager",
    "Certified AI Manager",
    "Web Design",
    "Web Development",
    "AI Automation",
    "AI Systems",
    "Intelligent Agents",
    "MCP Automation",
    "Cybersecurity",
    "CompTIA Security+",
    "Full-stack Development",
    "Next.js Developer",
    "React Developer",
    "AI Product Leadership",
    "AI Copilots",
    "Automation Systems",
    "Hamburg Web Design",
    "Germany AI Agency",
    "AI Image Generation",
    "AI Video Content",
    "Portfolio Website",
    "AI Consulting",
    "Product Management",
  ],
  authors: [{ name: "Maurice Holda" }],
  creator: "Maurice Holda",
  publisher: "Naga Codex",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nagacodex.com",
    title: "Maurice Holda | Naga Codex - Certified AI Manager & Web Design",
    description:
      "Certified AI Manager and web design expert specializing in AI automation, intelligent systems, and full-stack development. Based in Hamburg, Germany.",
    siteName: "Naga Codex",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Naga Codex - AI Agency Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maurice Holda | Naga Codex - Certified AI Manager & Web Design",
    description:
      "Certified AI Manager and web design expert specializing in AI automation, intelligent systems, and full-stack development.",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "https://nagacodex.com",
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  metadataBase: new URL("https://nagacodex.com"),
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
