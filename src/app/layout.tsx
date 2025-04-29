import "@/styles/globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};
export const metadata: Metadata = {
  title: {
    default: "Interactive Game CV - Creative Portfolio",
    template: "%s | Game CV"
  },
  description: "An interactive CV inspired by classic video games, allowing you to navigate through different sections like education, experience, and skills in a fun, engaging way.",
  applicationName: "Game CV",
  keywords: ["cv", "resume", "mario", "interactive", "game", "portfolio", "creative", "designer", "developer", "ui/ux"],
  authors: [{
    name: "Creative Designer"
  }],
  creator: "Creative Designer",
  publisher: "Creative Designer",
  icons: {
    icon: [{
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mario CV"
  },
  formatDetection: {
    telephone: false
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en" className={`${GeistSans.variable}`} data-unique-id="7cf15f1c-c459-4531-a5d1-0b1a4ecf1165" data-loc="58:9-58:61" data-file-name="app/layout.tsx">
      <body className="overflow-hidden" data-unique-id="b141efe7-8983-483a-9fe7-d99963ee00c4" data-loc="59:6-59:40" data-file-name="app/layout.tsx">{children}</body>
    </html>;
}