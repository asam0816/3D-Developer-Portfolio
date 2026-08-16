import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import FrozenBackground from "@/components/FrozenBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticTargets from "@/components/MagneticTargets";

import SeasonProvider, {
  SEASON_BOOT_SCRIPT,
} from "@/components/SeasonProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Asam — Software Engineer & Tech Lead",

  description:
    "Immersive portfolio of Mohamed Asam — Software Engineer and Tech Lead. Building modern web applications with Next.js, React, and React Three Fiber.",

  authors: [{ name: "Mohamed Asam" }],

  openGraph: {
    title: "Mohamed Asam — Software Engineer & Tech Lead",

    description:
      "Immersive interactive 3D portfolio built with Next.js, React, React Three Fiber, and GLSL.",

    type: "website",

    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title: "Mohamed Asam — Software Engineer & Tech Lead",

    description:
      "Immersive interactive 3D portfolio built with Next.js, React, React Three Fiber, and GLSL.",
  },

  other: {
    "pdf:title": "Mohamed_Asam_Resume.pdf",
  },
};

export const viewport: Viewport = {
  themeColor: "#060e1c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent automatic browser translation */}
        <meta name="google" content="notranslate" />

        {/* Apply season before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: SEASON_BOOT_SCRIPT,
          }}
        />
      </head>

      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <SeasonProvider>
          <FrozenBackground />

          <ScrollProgress />

          {children}

          <CustomCursor />

          <MagneticTargets />
        </SeasonProvider>
      </body>
    </html>
  );
}