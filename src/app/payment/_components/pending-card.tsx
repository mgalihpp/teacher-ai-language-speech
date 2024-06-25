import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCursorWait } from "@/hooks/use-cursor-await";
import { api } from "@/trpc/react";
import { type LucideProps } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentPending({
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
  const { mutate: createSnap, isPending: isCreating } =
    api.midtrans.snap.useMutation();

  const router = useRouter();

  const calculateCredits = () => {
    const amount = Number(gross_amount);

    if (amount >= 50000) {
      return 500;
    } else if (amount >= 20000 && amount < 50000) {
      return 250;
    } else {
      return 100;
    }
  };

  useCursorWait(isCreating);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="w-full max-w-lg rounded-lg bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <ClockIcon className="h-12 w-12 text-yellow-500" />
          <h1 className="text-2xl font-bold">Payment Pending</h1>
          <p className="text-muted-foreground">
            Your payment is being processed. You will receive a confirmation
            email once the payment is complete.
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
          <Button
            onClick={() => {
              createSnap(
                {
                  name: `+${calculateCredits()} Credits`,
                  gross_amount: Number(gross_amount),
                },
                {
                  onSuccess: (data) => {
                    router.push(data.redirect_url);
                  },
                  onError: (error) => {
                    console.log(error.message);
                    toast.error(error.message);
                  },
                },
              );
            }}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function ClockIcon(props: LucideProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
