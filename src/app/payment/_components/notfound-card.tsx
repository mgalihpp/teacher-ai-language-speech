import { Separator } from "@/components/ui/separator";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function PaymentNotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="w-full max-w-lg rounded-lg bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <SearchX className="h-12 w-12 text-orange-500" />
          <h1 className="text-2xl font-bold">Not Found</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find a payment with the order ID you provided.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-center">
          <Link
            href="/#hero"
            aria-current="page"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
