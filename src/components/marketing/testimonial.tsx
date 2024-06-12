import React from "react";
import Marquee from "../marquee";

interface CardProps {
  name: string;
  position: string;
  text: string;
  photoLink: string;
  tweetLink: string;
}

const Card: React.FC<CardProps> = ({
  name,
  position,
  text,
  photoLink,
  tweetLink,
}) => {
  return (
    <div className="group relative">
      <a href={"#"} className="cursor-pointer">
        <div className="highlight relative space-y-6 rounded-lg bg-stone-100 p-6 leading-none ring-1 ring-gray-900/5 dark:bg-neutral-900">
          <div className="flex items-center space-x-4">
            <img
              src={photoLink}
              className="h-12 w-12 rounded-full border bg-cover bg-center"
              alt={name}
            />
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {name}
              </h3>
              <p className="text-md text-stone-700 dark:text-stone-300">
                {position}
              </p>
            </div>
          </div>
          <p className="text-md leading-normal text-stone-800 dark:text-stone-200">
            {text}
          </p>
        </div>
      </a>
    </div>
  );
};

export default function Testimonial() {
  return (
    <section id="testimonial" className="py-20">
      <div className="mx-8 max-w-7xl md:mx-10 lg:mx-20 xl:mx-auto">
        <div
          className="translate-x-0 translate-y-0 scale-100 
            transform opacity-100 transition duration-500 ease-in-out"
        >
          <div className="mb-12 space-y-5 text-center md:mb-20">
            {/* <div
              className="inline-block rounded-lg bg-blue-100 bg-opacity-60 px-3 py-1 text-sm 
                    font-semibold text-blue-600 dark:bg-blue-900 dark:text-stone-100"
            >
              Words
            </div> */}
            <h1 className="text-3xl font-semibold text-stone-800 dark:text-stone-200 md:text-5xl">
              Loved by our students
            </h1>
            <p className="mx-auto text-xl text-stone-600 dark:text-stone-300 md:w-2/3 md:text-2xl">
              See what our students have to say about our product.
            </p>
          </div>
        </div>
        <div className="relative grid max-h-[49rem] grid-cols-1 gap-6 overflow-y-hidden sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-8">
            <Marquee vertical duration="fast">
              <div className="text-sm leading-6">
                <Card
                  name="Kanye West"
                  position="Rapper & Entrepreneur"
                  text="Find God."
                  photoLink="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                  tweetLink="https://twitter.com/kanyewest"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Tim Cook"
                  position="CEO of Apple"
                  text="Diam quis enim lobortis scelerisque fermentum
                      dui faucibus in ornare. Donec pretium vulputate
                      sapien nec sagittis aliquam malesuada bibendum."
                  photoLink="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                  tweetLink="https://twitter.com/tim_cook"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Kanye West"
                  position="Rapper & Entrepreneur"
                  text="Find God."
                  photoLink="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                  tweetLink="https://twitter.com/kanyewest"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Tim Cook"
                  position="CEO of Apple"
                  text="Diam quis enim lobortis scelerisque fermentum
                      dui faucibus in ornare. Donec pretium vulputate
                      sapien nec sagittis aliquam malesuada bibendum."
                  photoLink="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                  tweetLink="https://twitter.com/tim_cook"
                />
              </div>
            </Marquee>
          </div>
          <div className="space-y-8">
            <Marquee vertical>
              <div className="text-sm leading-6">
                <Card
                  name="Satya Nadella"
                  position="CEO of Microsoft"
                  text="Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut."
                  photoLink="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                  tweetLink="https://twitter.com/satyanadella"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Dan Schulman"
                  position="CEO of PayPal"
                  text="Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus."
                  photoLink="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                  tweetLink="https://twitter.com/dan_schulman"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Satya Nadella"
                  position="CEO of Microsoft"
                  text="Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut."
                  photoLink="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                  tweetLink="https://twitter.com/satyanadella"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Dan Schulman"
                  position="CEO of PayPal"
                  text="Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus."
                  photoLink="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                  tweetLink="https://twitter.com/dan_schulman"
                />
              </div>
            </Marquee>
          </div>
          <div>
            <Marquee vertical duration="fast">
              <div className="text-sm leading-6">
                <Card
                  name="Satya Nadella"
                  position="CEO of Microsoft"
                  text="Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut."
                  photoLink="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                  tweetLink="https://twitter.com/satyanadella"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Dan Schulman"
                  position="CEO of PayPal"
                  text="Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus."
                  photoLink="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                  tweetLink="https://twitter.com/dan_schulman"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Satya Nadella"
                  position="CEO of Microsoft"
                  text="Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut."
                  photoLink="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                  tweetLink="https://twitter.com/satyanadella"
                />
              </div>
              <div className="text-sm leading-6">
                <Card
                  name="Dan Schulman"
                  position="CEO of PayPal"
                  text="Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus."
                  photoLink="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                  tweetLink="https://twitter.com/dan_schulman"
                />
              </div>
            </Marquee>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-md bg-gradient-to-b from-white dark:from-background" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 rounded-md bg-gradient-to-t from-white dark:from-background" />
        </div>
      </div>
    </section>
  );
}
