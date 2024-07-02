import React, { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./video-player"), {
  ssr: false,
  loading: () => <PlayerLoader />,
});

const Demo = async () => {
  const t = await getTranslations("Demo");

  return (
    <section id="demo" className="bg-opacity-50 py-20">
      <div className="mx-8 max-w-7xl md:mx-10 lg:mx-20 xl:mx-auto">
        <div
          className="translate-x-0 translate-y-0 scale-100 
            transform opacity-100 transition duration-500 ease-in-out"
        >
          <div className="mb-12 space-y-5 text-left md:mb-20 md:text-center">
            <div
              className="inline-block rounded-lg bg-blue-100 bg-opacity-60 px-3 py-1 text-sm 
                    font-semibold text-blue-600 dark:bg-blue-900 dark:text-stone-100"
            >
              {t("action")}
            </div>
            <h1 className="text-3xl font-semibold text-stone-800 dark:text-stone-200 md:text-5xl">
              {t("header")}
            </h1>
            <p className="mx-auto text-xl text-stone-600 dark:text-stone-300 md:w-2/3 md:text-2xl">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-8 sm:px-6 lg:px-8">
        <div className="h-[24rem] w-full">
          <Suspense fallback={<PlayerLoader />}>
            <VideoPlayer />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

function PlayerLoader() {
  return <Skeleton className="h-[24rem] w-full" />;
}

export default Demo;
