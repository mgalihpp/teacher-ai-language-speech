// import { Check, Clock } from "lucide-react";
// import React from "react";

// const Support = () => {
//   return (
//     <section id="support" className="my-24 px-4 max-sm:px-2">
//       <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center">
//         <h1 className="py-7 text-center text-lg font-bold uppercase text-stone-900">
//           NEW LANGUAGES AND LANGUAGE VARIATIONS
//         </h1>

//         <div
//           className="flex w-full justify-around text-sm max-sm:flex-col
//         max-sm:items-center max-sm:space-y-8"
//         >
//           <div>
//             <p className="pb-4 text-stone-800">Currently supported languages:</p>
//             <ul className="space-y-1.5 text-stone-700">
//               <li className="flex items-center gap-2">
//                 <Check className="size-4 stroke-green-500" />
//                 Bahasa Indonesia
//               </li>
//               <li className="flex items-center gap-2">
//                 <Check className="size-4 stroke-green-500" />
//                 Bahasa Inggris
//               </li>
//             </ul>
//           </div>
//           <div>
//             <p className="pb-4 text-stone-800">Upcoming languages:</p>
//             <ul className="space-y-1.5 text-stone-700 w-full">
//               <li className="flex items-center gap-2">
//                 <Clock className="size-4 stroke-yellow-500" />
//                 Bahasa German
//               </li>
//               <li className="flex items-center gap-2">
//                 <Clock className="size-4 stroke-yellow-500" />
//                 Bahasa Francis
//               </li>
//               <li className="flex items-center gap-2">
//                 <Clock className="size-4 stroke-yellow-500" />
//                 Bahasa Jepang
//               </li>
//               <li className="flex items-center gap-2">
//                 <Clock className="size-4 stroke-yellow-500" />
//                 Bahasa Spanyol
//               </li>
//               <li className="flex items-center gap-2">
//                 <Clock className="size-4 stroke-yellow-500" />
//                 Bahasa Rusia
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Support;

import { languagesSupport, upcommingLanguages } from "@/constants";
import React from "react";

const Support = () => {
  return (
    <section id="support">
      <div className="py-36">
        <div className="mx-auto max-w-6xl px-6 text-stone-500">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-950 dark:text-white md:text-5xl">
              Languages Variantions
            </h2>
            <p className="mt-6 text-lg text-stone-700 dark:text-stone-300">
              We are constantly working on improving the language support for
              our AI. <br /> Help us to support new language variants by
              providing feedback and suggestions.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-24 max-sm:flex-col max-sm:space-y-8">
            <div className="flex w-full max-w-sm flex-col max-sm:mx-auto max-sm:items-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-primary">
                  Currently Support
                </h2>
                <p className="mt-6 text-stone-700 dark:text-stone-300">
                  Our current model supports 2 languages including English and
                  Indonesia.
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
                  Upcomming Languages
                </h2>
                <p className="mt-6 text-stone-700 dark:text-stone-300">
                  We are working on new language variations. Stay tuned!
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
