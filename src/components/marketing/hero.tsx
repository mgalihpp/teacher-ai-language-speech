import { getTranslations } from "next-intl/server";
import React from "react";

const Hero = async () => {
  const t = await getTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative bg-[url(/images/prev1.webp)] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm"></div>

      <div className="relative mx-auto flex w-full max-w-screen-xl justify-center px-4 py-32 sm:px-6 lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-stone-300 sm:text-lg/relaxed">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
            <a
              href="#demo"
              aria-current="page"
              aria-label="Learn Now"
              className="group relative inline-flex h-12 items-center 
              justify-center overflow-hidden rounded-md border bg-transparent px-8 
              font-medium text-stone-200 transition-all duration-200 ease-out 
              hover:bg-white hover:text-stone-950 dark:border-white"
            >
              <span
                className="absolute h-56 w-full rounded-full transition-all 
              duration-300 group-hover:size-0"
              ></span>
              <span className="relative">{t("btn_text")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
