import { languagesSupport, upcommingLanguages } from "@/constants";
import { getTranslations } from "next-intl/server";
import React from "react";

const Support = async () => {
  const t = await getTranslations("Support");

  return (
    <section id="support">
      <div className="py-36">
        <div className="mx-auto max-w-6xl px-6 text-stone-500">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t("header")}
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-stone-700 dark:text-stone-300">
              {t("description")}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-24 max-sm:flex-col max-sm:space-y-8">
            <div className="flex w-full max-w-sm flex-col max-sm:mx-auto max-sm:items-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-primary">
                  {t("section1_header")}
                </h2>
                <p className="mt-6 text-stone-700 dark:text-stone-300">
                  {t("section1_description")}
                </p>
              </div>

              <div className="relative -mx-6 mt-12 h-fit w-fit overflow-x-auto px-6 max-sm:mx-auto sm:mx-auto sm:px-0">
                <div className="mx-auto mb-3 flex w-fit gap-3 text-stone-950 dark:text-white">
                  {languagesSupport.map((language, index) => (
                    <div
                      key={index}
                      className="relative mx-auto flex 
                size-20 rounded-3xl border bg-gray-100 *:relative 
                *:m-auto *:size-7 before:absolute before:inset-0 
                before:rounded-3xl before:border-t before:border-white 
                before:bg-gradient-to-b before:from-stone-100 
                before:shadow dark:border-white/15 dark:bg-stone-900 
                dark:before:border-white/20 dark:before:from-white/10 
                dark:before:to-transparent dark:before:shadow-stone-950"
                    >
                      <language.icon />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full max-w-sm flex-col max-sm:mx-auto max-sm:items-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-primary">
                  {t("section2_header")}
                </h2>
                <p className="mt-6 text-stone-700 dark:text-stone-300">
                  {t("section2_description")}
                </p>
              </div>
              <div className="relative -mx-6 mt-12 h-fit w-fit overflow-x-auto px-6 sm:mx-auto sm:px-0">
                <div className="mb-3 grid grid-cols-3 gap-3">
                  {upcommingLanguages.map((language, index) => (
                    <div
                      key={index}
                      className="relative mx-auto flex 
                size-20 rounded-3xl border bg-gray-100 *:relative 
                *:m-auto *:size-7 before:absolute before:inset-0 
                before:rounded-3xl before:border-t before:border-white 
                before:bg-gradient-to-b before:from-stone-100 
                before:shadow dark:border-white/15 dark:bg-stone-900 
                dark:before:border-white/20 dark:before:from-white/10 
                dark:before:to-transparent dark:before:shadow-stone-950"
                    >
                      <language.icon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;

// We are also working on adding support for new
//                 languages, so if you have a specific language in mind that you
//                 would like us to add, please let us know. Your feedback is
//                 valuable to us, and we appreciate any suggestions or comments
//                 you may have. Together, we can make our AI even better for
//                 everyone.
