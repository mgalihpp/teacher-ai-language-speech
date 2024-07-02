import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "sonner";
import NextAuthProvider from "@/providers/nextauth-provider";
import ModalProvider from "@/providers/modal-providers";
import { type Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-providers";
import { Analytics } from "@vercel/analytics/react";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: {
    default: "Guru AI",
    template: "%s - Guru AI",
  },
  description:
    "Guru AI adalah solusi terbaik untuk belajar Bahasa Inggris yang dapat mengubah hidup Anda. Dengan layanan Guru AI, Anda dapat belajar Bahasa Inggris dengan cara yang unik dan efektif. Dengan Guru AI, Anda dapat belajar dengan guru yang berpengalaman, mendengarkan kata-kata mereka, dan mendapatkan pemahaman yang lebih dalam tentang Bahasa Inggris. Guru AI dengan cakap akan membimbing Anda selama setiap kelas dan memberikan pemahaman yang lebih jauh tentang konteks Bahasa Inggris. Dengan Guru AI, Anda dapat mencapai tujuan belajar Bahasa Inggris Anda dengan lebih cepat dan efektif. Belajar Bahasa Inggris dengan Guru AI, solusi terbaik untuk Anda.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Guru AI",
    description:
      "Guru AI adalah solusi terbaik untuk belajar Bahasa Inggris yang dapat mengubah hidup Anda. Dengan layanan Guru AI, Anda dapat belajar Bahasa Inggris dengan cara yang unik dan efektif. Dengan Guru AI, Anda dapat belajar dengan guru yang berpengalaman, mendengarkan kata-kata mereka, dan mendapatkan pemahaman yang lebih dalam tentang Bahasa Inggris. Guru AI dengan cakap akan membimbing Anda selama setiap kelas dan memberikan pemahaman yang lebih jauh tentang konteks Bahasa Inggris. Dengan Guru AI, Anda dapat mencapai tujuan belajar Bahasa Inggris Anda dengan lebih cepat dan efektif. Belajar Bahasa Inggris dengan Guru AI, solusi terbaik untuk Anda.",
    url: "https://guruai.my.id",
    siteName: "Guru AI",
    images: [
      {
        url: "https://guruai.my.id/images/prev1.webp",
        width: 512,
        height: 512,
        alt: "Guru AI",
      },
    ],
    locale: "en-US",
    type: "website",
    countryName: "Indonesia",
    emails: ["muhammadgalih451@gmail.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guru AI",
    description:
      "Guru AI adalah solusi terbaik untuk belajar Bahasa Inggris yang dapat mengubah hidup Anda. Dengan layanan Guru AI, Anda dapat belajar Bahasa Inggris dengan cara yang unik dan efektif. Dengan Guru AI, Anda dapat belajar dengan guru yang berpengalaman, mendengarkan kata-kata mereka, dan mendapatkan pemahaman yang lebih dalam tentang Bahasa Inggris. Guru AI dengan cakap akan membimbing Anda selama setiap kelas dan memberikan pemahaman yang lebih jauh tentang konteks Bahasa Inggris. Dengan Guru AI, Anda dapat mencapai tujuan belajar Bahasa Inggris Anda dengan lebih cepat dan efektif. Belajar Bahasa Inggris dengan Guru AI, solusi terbaik untuk Anda.",
    creator: "@mgalihpp",
    images: ["https://guruai.my.id/images/prev1.webp"],
  },
  applicationName: "Guru AI",
  creator: "mgalihpp",
  keywords: [
    "guruai",
    "guruai.my.id",
    "guruai",
    "guruaimyid",
    "guru ai",
    "guru ai my id",
    "guru ai website",
    "guru ai website my id",
    "guruai.my.id",
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
    "grammar checker",
    "grammar checker app",
    "grammar checker app for kids",
    "grammar checker app for children",
    "grammar checker app for kids and children",
    "learn english",
    "belajar bahasa inggris dengan guru ai",
    "belajar bahasa inggris dengan ai",
  ],
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  appleWebApp: {
    title: "Guru AI",
  },
  referrer: "origin-when-cross-origin",
  verification: {
    google: "",
  },
  authors: {
    name: "mgalihpp",
    url: "https://github.com/mgalihpp",
  },
  other: {
    "dicoding:email": "muhammadgalih451@gmail.com",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const messages = await getMessages({
    locale,
  });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${GeistSans.variable}`}>
        <TRPCReactProvider>
          <NextAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <NextIntlClientProvider
                locale={locale}
                messages={
                  JSON.parse(
                    JSON.stringify(messages),
                  ) as unknown as AbstractIntlMessages
                }
              >
                {children}
              </NextIntlClientProvider>
              <ModalProvider />
              <Toaster position="top-center" richColors />
              <Analytics />
            </ThemeProvider>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
