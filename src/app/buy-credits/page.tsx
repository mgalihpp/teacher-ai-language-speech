import { api } from "@/trpc/server";
import Pricing from "@/components/marketing/pricing";
import Testimonial from "@/components/marketing/testimonial";
import { getTranslations } from "next-intl/server";

export default async function BuyCreditsPage() {
  const { session, user } = await api.user.getUser();

  const t = await getTranslations("BuyCredits");

  return (
    <>
      <section className="mx-auto w-full max-w-7xl pt-32">
        <div className="flex w-full flex-col items-center justify-center space-y-4 px-4 py-2">
          <h1 className="max-w-5xl text-center text-5xl font-bold max-sm:text-4xl">
            {t("header")}
          </h1>
          <p className="max-w-2xl text-center text-sm max-sm:text-xs">
            {t("description")}
          </p>

          <Pricing credits={user?.credits ?? 0} session={session} />
        </div>
      </section>

      <Testimonial />
    </>
  );
}
