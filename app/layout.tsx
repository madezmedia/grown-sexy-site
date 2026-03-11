import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://grown-sexy-site.vercel.app"),
  title: {
    default: "The Grown & Sexy Movement | Luxury Lifestyle & Events",
    template: "%s | The Grown & Sexy Movement",
  },
  description: "An exclusive lifestyle community for individuals ages 30+. Featuring GODDE$$, monthly spades tournaments, health & wellness, and authentic connections. It's not about your appearance — it's about your attitude.",
  keywords: ["luxury lifestyle", "community over 30", "spades tournament", "health and wellness", "grown and sexy", "exclusive events", "networking"],
  authors: [{ name: "The Grown & Sexy Movement" }],
  creator: "The Grown & Sexy Movement",
  publisher: "The Grown & Sexy Movement",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grown-sexy-site.vercel.app",
    siteName: "The Grown & Sexy Movement",
    title: "The Grown & Sexy Movement | Luxury Lifestyle & Events",
    description: "An exclusive lifestyle community for individuals ages 30+. Join the movement.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Grown & Sexy Movement",
    description: "An exclusive lifestyle community for individuals ages 30+.",
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Grown & Sexy Movement",
  "url": "https://grown-sexy-site.vercel.app",
  "logo": "https://grown-sexy-site.vercel.app/favicon.ico",
  "description": "An exclusive lifestyle community for individuals ages 30+.",
  "sameAs": [
    "https://www.instagram.com/grownandsexymovement",
    // Add other social links here
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
