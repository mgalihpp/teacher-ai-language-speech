import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Payment",
};

export default async function PaymentLayout({
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
