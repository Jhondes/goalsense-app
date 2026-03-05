import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Football Generator | Smart Market Predictions",
  description:
    "Generate intelligent football markets using advanced filtering and AI-powered logic. Built for serious football analysts.",

icons: {
    icon: "/icon.png",
  },

  keywords: [
    "football predictions",
    "football generator",
    "over 2.5 goals",
    "football betting analytics",
    "smart football markets",
  ],

  openGraph: {
    title: "Football Generator",
    description:
      "Smart AI-powered football market generator.",
    url: "https://yourdomain.vercel.app", // change after deploy
    siteName: "Football Generator",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Football Generator",
    description:
      "Generate intelligent football markets using AI-powered logic.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}