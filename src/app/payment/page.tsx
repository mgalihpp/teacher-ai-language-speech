"use client";

import { api } from "@/trpc/react";
import PaymentSuccess from "./_components/success-card";
import { Loader2 } from "lucide-react";
import PaymentPending from "./_components/pending-card";
import PaymentFailed from "./_components/failed-card";
import PaymentNotFound from "./_components/notfound-card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { toast } from "sonner";
import { useEffect } from "react";

export default function PaymentPage({
  searchParams,
}: {
  searchParams?: {
    order_id: string;
    status_code: string;
    transaction_status: string;
  };
}) {
  const { data: session } = useSession();
  const { setModalOpen } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setModalOpen(true);
      toast.warning("Please login to continue.");
      return router.push("/");
    }
  }, [session, router]);

  const { data, isLoading } = api.midtrans.getTransactionStatus.useQuery(
    {
      orderId: searchParams?.order_id ?? "",
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  return isLoading ? (
    <div className="mx-auto flex h-dvh w-full max-w-lg items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  ) : data ? (
    <>
      {(data.transaction_status === "settlement" ||
        data.transaction_status === "capture") && (
        <PaymentSuccess
          order_id={data.transaction_id}
          gross_amount={data.gross_amount}
          payment_type={data.payment_type}
          transaction_time={data.transaction_time}
        />
      )}

      {data.transaction_status === "pending" && (
        <PaymentPending
          order_id={data.transaction_id}
          gross_amount={data.gross_amount}
          payment_type={data.payment_type}
          transaction_time={data.transaction_time}
        />
      )}

      {(data.transaction_status === "cancel" ||
        data.transaction_status === "deny" ||
        data.transaction_status === "expire") && (
        <PaymentFailed
          order_id={data.transaction_id}
          gross_amount={data.gross_amount}
          payment_type={data.payment_type}
          transaction_time={data.transaction_time}
        />
      )}
    </>
  ) : (
    <PaymentNotFound />
  );
}
