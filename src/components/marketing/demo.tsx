import React from "react";
import { VideoPlayer } from "./video-player";
import { Play } from "lucide-react";

const Demo = () => {
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
              Action
            </div>
            <h1 className="text-3xl font-semibold text-stone-800 dark:text-stone-200 md:text-5xl">
              Here&apos;s a demo of Guru AI
            </h1>
            <p className="mx-auto text-xl text-stone-600 dark:text-stone-300 md:w-2/3 md:text-2xl">
              Take a tour of Guru AI and see how it can help you improve your
              English skills.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-8 sm:px-6 lg:max-w-5xl lg:px-8">
        <VideoPlayer>
          <div className="group relative">
            <img
              src="/images/prev1.webp"
              className="mt-8 rounded-xl"
              alt="placeholder"
            />

            <div
              className="absolute inset-0 z-10 m-auto
              hidden h-full w-full items-center justify-center transition-all group-hover:flex"
            >
              <div className="rounded-full bg-stone-100 p-2">
                <Play className="size-8 text-stone-900" />
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-xl bg-black/30
                  transition-opacity duration-300 group-hover:pointer-events-none group-hover:bg-black/60"
            />
          </div>
        </VideoPlayer>
      </div>
    </section>
  );
};

export default Demo;
