import "./globals.css";
import type { Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
import OrganizationSchema from "./organization-schema";
import WebsiteSchema from "./website-schema";
import WebApplicationSchema from "./webapplication-schema";
import AppLoader from "@/components/AppLoader";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "GoalSense | Smart Football Prediction Generator",
  description:
    "GoalSense is a smart football prediction generator that helps users create football prediction slips using advanced filtering and intelligent match selection.",

  icons: {
    icon: "/icon.png",
  },

  metadataBase: new URL("https://goalsense.live"),

  alternates: {
  canonical: "/",
},

  keywords: [
    "football predictions",
    "football generator",
    "over 2.5 goals",
    "football betting analytics",
    "smart football markets",
  ],

  openGraph: {
  title: "GoalSense | Smart Football Prediction Generator",
  description:
    "Generate football prediction slips with intelligent filtering and advanced match selection.",
  url: "https://goalsense.live",
  siteName: "GoalSense",
  type: "website",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "GoalSense",
    },
  ],
},

  twitter: {
  card: "summary_large_image",
  title: "GoalSense",
  description:
    "Generate football prediction slips with intelligent filtering.",
  images: ["/og-image.png"],
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
        <OrganizationSchema />
        <WebsiteSchema />
        <WebApplicationSchema />
        <GoogleAnalytics />

       <AppLoader>
  <UserProvider>
    {children}
  </UserProvider>
</AppLoader>
      </body>
    </html>
  );
}