import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "sonner";
import NextAuthProvider from "@/providers/nextauth-provider";
import ModalProvider from "@/providers/modal-providers";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Guru Ai",
  description: "Belajar Bahasa Ingrris dengan Guru Ai",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Guru Ai",
    description: "Belajar Bahasa Ingrris dengan Guru Ai",
    url: "https://teacher-ai-speech.vercel.app",
    siteName: "Guru Ai",
    images: [
      {
        url: "https://teacher-ai-speech.vercel.app/icon512_rounded.png",
        width: 512,
        height: 512,
        alt: "Guru Ai",
      },
    ],
    locale: "en-US",
    type: "website",
    countryName: "Indonesia",
    emails: ["guruai@pm.me"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guru Ai",
    description: "Belajar Bahasa Ingrris dengan Guru Ai",
    creator: "@guruai",
    images: ["https://teacher-ai-speech.vercel.app/icon512_rounded.png"],
  },
  applicationName: "Guru Ai",
  creator: "mgalihpp",
  keywords: [
    "guruai",
    "guruai.vercel.app",
    "ai",
    "language",
    "teacher",
    "learn",
    "education",
    "english",
    "grammar",
    "vocabulary",
    "pronunciation",
  ],
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  appleWebApp: {
    title: "Guru Ai",
  },
  referrer: "origin-when-cross-origin",
  verification: {
    google: "",
  },
  authors: {
    name: "mgalihpp",
    url: "https://github.com/mgalihpp",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextAuthProvider>
            {children}
            <ModalProvider />
            <Toaster position="top-center" richColors />
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
