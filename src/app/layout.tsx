import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "sonner";
import NextAuthProvider from "@/providers/nextauth-provider";
import ModalProvider from "@/providers/modal-providers";

export const metadata = {
  title: "AI Sensei",
  description: "Learn Japanese with AI Sensei",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
