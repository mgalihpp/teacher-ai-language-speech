import React from "react";
import { getMessages, getTranslations } from "next-intl/server";

interface CardProps {
  name: string;
  position: string;
  text: string;
  photoLink: string;
}

const Card: React.FC<CardProps> = ({ name, position, text, photoLink }) => {
  return (
    <div className="group relative">
      <div className="cursor-pointer">
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
      </div>
    </div>
  );
};

export default async function Testimonial() {
  const t = await getTranslations("Testimonial");
  const tTestimonial = await getTranslations("Testimonial.people");

  const messages = (await getMessages()) as unknown as IntlMessages;

  const keys = ["testimonials1", "testimonials2", "testimonials3"] as const;

  const people = messages.Testimonial.people;

  return (
    <section id="testimonial" className="py-20">
      <div className="mx-8 max-w-7xl md:mx-10 lg:mx-20 xl:mx-auto">
        <div
          className="translate-x-0 translate-y-0 scale-100 
            transform opacity-100 transition duration-500 ease-in-out"
        >
          <div className="mb-12 space-y-5 text-center md:mb-20">
            <h1 className="text-3xl font-semibold text-stone-800 dark:text-stone-200 md:text-5xl">
              {t("header")}
            </h1>
            <p className="mx-auto text-xl text-stone-600 dark:text-stone-300 md:w-2/3 md:text-2xl">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="relative grid h-auto grid-cols-1 justify-center gap-6 overflow-y-hidden sm:flex sm:flex-wrap lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-8">
            {people.testimonials1.map((item, index) => (
              <div className="text-sm leading-6" key={index}>
                <Card
                  name={tTestimonial(`${keys[0]}.${index}.name`)}
                  position={tTestimonial(`${keys[0]}.${index}.position`)}
                  text={tTestimonial(`${keys[0]}.${index}.text`)}
                  photoLink={tTestimonial(`${keys[0]}.${index}.photoLink`)}
                />
              </div>
            ))}
          </div>
          <div className="space-y-8">
            {people.testimonials2.map((item, index) => (
              <div className="text-sm leading-6" key={index}>
                <Card
                  name={tTestimonial(`${keys[1]}.${index}.name`)}
                  position={tTestimonial(`${keys[1]}.${index}.position`)}
                  text={tTestimonial(`${keys[1]}.${index}.text`)}
                  photoLink={tTestimonial(`${keys[1]}.${index}.photoLink`)}
                />
              </div>
            ))}
          </div>
          <div className="space-y-8">
            {people.testimonials3.map((item, index) => (
              <div className="text-sm leading-6" key={index}>
                <Card
                  name={tTestimonial(`${keys[2]}.${index}.name`)}
                  position={tTestimonial(`${keys[2]}.${index}.position`)}
                  text={tTestimonial(`${keys[2]}.${index}.text`)}
                  photoLink={tTestimonial(`${keys[2]}.${index}.photoLink`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
