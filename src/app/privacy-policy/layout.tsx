import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kebijakan Privasi untuk Guru AI",
};

export default async function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
