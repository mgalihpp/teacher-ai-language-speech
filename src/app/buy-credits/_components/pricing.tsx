"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import Script from "next/script";
import { plans } from "@/constants";
import { useCursorWait } from "@/hooks/use-cursor-await";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { type Session } from "next-auth";

type PricingCardProps = {
  title: string;
  price: number;
  credits: number;
  description: string;
  actionLabel: string;
  popular?: boolean;
  session: Session | null;
};

// Declare the snap object
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: unknown) => void;
          onError: (e: unknown) => void;
        },
      ) => void;
    };
  }
}
const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="pt-1 text-lg">{subtitle}</p>
    <br />
  </section>
);

const PricingCard = ({
  title,
  price,
  description,
  credits,
  actionLabel,
  popular,
  session,
}: PricingCardProps) => {
  const { setOpen } = useModal();

  const { mutate: createSnap, isPending: isCreating } =
    api.midtrans.snap.useMutation();

  const { mutate: updateUserCredits, isPending: isUpdating } =
    api.midtrans.updateUserCredits.useMutation();

  const router = useRouter();

  useCursorWait(isCreating || isUpdating);
  return (
    <Card
      className={cn(
        `flex w-72 flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`,
      )}
    >
      <div>
        <CardHeader className="pb-8 pt-4">
          <CardTitle className="text-lg text-zinc-700">{title}</CardTitle>
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">Rp. {price}</h3>
          </div>
          <CardDescription className="h-12 pt-1.5">
            {description}
          </CardDescription>
        </CardHeader>
      </div>
      <CardFooter className="mt-3">
        <Button
          disabled={isCreating}
          onClick={() => {
            if (!session?.user.id) {
              toast.error("Please login first");

              setOpen(true);

              return;
            }

            createSnap(
              {
                name: title,
                gross_amount: price,
              },
              {
                onSuccess: (data) => {
                  window.snap.pay(data.token, {
                    onSuccess: (result) => {
                      console.log(result);

                      updateUserCredits(
                        {
                          credits,
                        },
                        {
                          onSuccess: () => {
                            toast.success("Credits updated!");
                            router.refresh();
                          },
                          onError: (error) => {
                            console.log(error);
                            toast.error(error.message);
                          },
                        },
                      );
                    },
                    onError: (error) => {
                      console.log(error);
                      toast.error(JSON.stringify(error));
                    },
                  });
                },
                onError: (error) => {
                  console.log(error.message);
                  toast.error(error.message);
                },
              },
            );
          }}
          className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          {actionLabel}
        </Button>
      </CardFooter>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="SB-Mid-client-61XuGAwQ8Bj8LxSS"
        type="text/javascript"
      />
    </Card>
  );
};

export default function Pricing({
  credits,
  session,
}: {
  credits: number;
  session: Session | null;
}) {
  return (
    <div className="py-8">
      <PricingHeader
        title="Pricing Plans"
        subtitle={`You have ${credits} Credits. Choose the plan that's right for you`}
      />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} session={session} />;
        })}
      </section>
    </div>
  );
}
