import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Ketentuan Layanan untuk Guru AI",
};

export default async function TermsOfServiceLayout({
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
