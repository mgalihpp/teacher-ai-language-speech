import { TERMS_OF_SERVICES } from "@/constants/blog";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Content = dynamic(() => import("@/components/marketing/content"), {
  ssr: false,
});

export default function BlogTemsPage() {
  return (
    <div className="mt-20">
      <div className="mx-auto w-full max-w-2xl text-center max-sm:px-4">
        <p className="text-base font-semibold leading-7 text-primary/90">
          Current as of{" "}
          {new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-6xl">
          Terms and conditions{" "}
        </h1>
        <p className="mt-6 text-lg leading-8 text-primary/80">
          By accessing our website, you are agreeing to be bound by these terms
          of service, and agree that you are responsible for compliance with any
          applicable local laws.
        </p>
      </div>
      <Suspense>
        <Content sections={TERMS_OF_SERVICES} />
      </Suspense>
    </div>
  );
}
