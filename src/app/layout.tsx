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
    default: "KangNi - Creative Portfolio",
    template: "%s | Game CV"
  },
  description: "An interactive CV inspired by classic video games, allowing you to navigate through different sections like education, experience, and skills in a fun, engaging way.",
  applicationName: "My Profile By KangNi",
  keywords: ["cv", "resume", "mario", "interactive", "game", "portfolio", "creative", "designer", "developer", "ui/ux"],
  authors: [{
    name: "Mahfudun Niam"
  }],
  creator: "X-Jaga Dev",
  publisher: "KangNi",
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
    title: "KangNi"
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
  return <html lang="en" className={`${GeistSans.variable}`} data-unique-id="0a28d416-fc25-4d21-8f3c-9bb32dfca9c3" data-loc="58:9-58:61" data-file-name="app/layout.tsx">
      <body className="overflow-hidden" data-unique-id="263a5a66-e82d-4057-99e2-097ff2d18d45" data-loc="59:6-59:40" data-file-name="app/layout.tsx">{children}</body>
    </html>;
}