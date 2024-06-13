import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="mt-18 relative bg-[url(/images/prev1.webp)] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm"></div>

      <div className="relative mx-auto flex w-full max-w-screen-xl justify-center px-4 py-32 sm:px-6 lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-2xl text-center text-white">
          {/* <Fade direction="up" delay={50} cascade damping={1e-1} triggerOnce> */}
          <h1 className="text-3xl font-bold sm:text-6xl">
            Learn English with
            <br />
            Guru AI
          </h1>
          {/* </Fade> */}
          {/* <Fade direction="up" delay={100} cascade damping={1e-1} triggerOnce> */}
          <p className="mx-auto mt-4 max-w-lg text-stone-300 sm:text-sm/relaxed">
            Guru AI for English. Learn English privately with an AI teacher.
          </p>
          {/* </Fade> */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
            {/* <Fade
          direction="up"
          delay={150}
          cascade
          damping={1e-1}
          triggerOnce
          > */}
            <a
              href="/chat"
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
              <span className="relative">Learn Now</span>
            </a>
            {/* </Fade> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
