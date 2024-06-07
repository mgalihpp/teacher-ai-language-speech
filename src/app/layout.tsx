import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "sonner";
import NextAuthProvider from "@/providers/nextauth-provider";
import ModalProvider from "@/providers/modal-providers";

export const metadata = {
  title: "Guru Ai",
  description: "Belajar Bahasa Ingrris dengan Guru Ai",
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
