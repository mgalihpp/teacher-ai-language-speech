import Image from "next/image";
import Link from "next/link";
import GradientWrapper from "./gradient-wrapper";

const FooterCTA = () => (
  <section id="get-started" className="mb-28 py-4">
    <GradientWrapper wrapperclassname="inset-0 top-12 h-[5rem] max-w-xs">
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-stone-800 dark:text-stone-200 sm:text-4xl">
            Get started with Guru AI Today!
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300">
            Free +50 Credits. No credit card required.
          </p>
          <Link
            href="/chat"
            className="mt-4 inline-block rounded-md bg-stone-800 px-4 
          py-2 text-sm font-medium text-stone-100 hover:bg-stone-600 
          active:bg-stone-900 dark:bg-stone-100 dark:text-stone-900 
          dark:hover:bg-stone-200 dark:active:bg-stone-200"
          >
            Start Chatting
          </Link>
        </div>
      </div>
      <Image
        src="/images/bg-pattern.webp"
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 m-auto hidden h-full w-full object-cover dark:block"
        alt="Background pattern"
      />
    </GradientWrapper>
  </section>
);

export default FooterCTA;
