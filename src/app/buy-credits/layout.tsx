import { type Metadata } from "next";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Buy Credits",
  description: "Buy Credits with Guru Ai",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
