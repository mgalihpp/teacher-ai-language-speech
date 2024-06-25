import Demo from "@/components/marketing/demo";
import Footer from "@/components/marketing/footer";
import FooterCTA from "@/components/marketing/footer-cta";
import Hero from "@/components/marketing/hero";
import Navbar from "@/components/marketing/navbar";
import Support from "@/components/marketing/support";
import Testimonial from "@/components/marketing/testimonial";
import Pricing from "@/components/marketing/pricing";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Demo />
        <Support />
        <Pricing session={session} />
        <Testimonial />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
