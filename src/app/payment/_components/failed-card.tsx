import { Separator } from "@/components/ui/separator";
import { CircleX } from "lucide-react";
import Link from "next/link";

export default function PaymentFailed({
  order_id,
  gross_amount,
  payment_type,
  transaction_time,
}: {
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="w-full max-w-lg rounded-lg bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <CircleX className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">
            There was an issue processing your payment. Please try again or
            contact support for assistance.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <p className="text-muted-foreground">Order ID</p>
            <p>{order_id}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <p className="text-muted-foreground">Total</p>
            <p>
              {Number(gross_amount).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <p className="text-muted-foreground">Payment Method</p>
            <p>{payment_type}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <p className="text-muted-foreground">Time</p>
            <p>{transaction_time}</p>
          </div>
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
