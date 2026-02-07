import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PreviewBanner from "@/components/PreviewBanner";
import { getSiteSettings } from "@/lib/sanity/queries";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Reclaim My Life - Sober Living Home",
    description:
        "A safe, supportive environment for recovery and personal growth. Join our community dedicated to helping you reclaim your life.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();
  let siteSettings = null;

  try {
    siteSettings = await getSiteSettings({ preview: isEnabled });
  } catch (error) {
    console.error("Failed to load site settings for footer:", error);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          isEnabled ? "pt-10" : ""
        }`}
      >
        <PreviewBanner isPreview={isEnabled} />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer contactInfo={siteSettings?.contactInfo} />
      </body>
    </html>
  );
}
