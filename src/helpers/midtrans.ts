import { env } from "@/env";

export function getMidtransClientKey(): string {
  return env.NODE_ENV === "development"
    ? env.MIDTRANS_SANDBOX_CLIENT_KEY
    : env.MIDTRANS_PRODUCTION_CLIENT_KEY;
}
