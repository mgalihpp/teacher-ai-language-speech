import { PRIVACY_POLICY } from "@/constants/blog";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Content = dynamic(() => import("@/components/marketing/content"), {
  ssr: false,
});

export default function BlogPrivacyPage() {
  return (
    <div className="mt-20">
      <div className="mx-auto w-full max-w-2xl text-center max-sm:px-4">
        <p className="text-base font-semibold leading-7 text-primary/90">
          Privacy Policy
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-6xl">
          We care about <br /> your privacy
        </h1>
        <p className="mt-6 text-lg leading-8 text-primary/80">
          Your privacy is important to us at https://www.guruai.my.id. We
          respect your privacy regarding any information we may collect from you
          across our website.
        </p>
      </div>
      <Suspense>
        <Content sections={PRIVACY_POLICY} />
      </Suspense>
    </div>
  );
}
