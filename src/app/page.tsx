import Demo from "@/components/marketing/demo";
import Footer from "@/components/marketing/footer";
import FooterCTA from "@/components/marketing/footer-cta";
import Hero from "@/components/marketing/hero";
import Navbar from "@/components/marketing/navbar";
import Support from "@/components/marketing/support";
import Testimonial from "@/components/marketing/testimonial";
import Pricing from "@/components/marketing/pricing";
import { getServerAuthSession } from "@/server/auth";
import { getMidtransClientKey } from "@/helpers/midtrans";

export default async function Home() {
  const session = await getServerAuthSession();
  const MIDTRANS_CLIENT_KEY = getMidtransClientKey();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Demo />
        <Support />
        <Pricing session={session} clientKey={MIDTRANS_CLIENT_KEY} />
        <Testimonial />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
