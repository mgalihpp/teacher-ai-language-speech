import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import MidTrans from "@/lib/midtrans/midtrans";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "@/env";

export const midtransRouter = createTRPCRouter({
  snap: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        gross_amount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const user = ctx.session.user;

        const snap = new MidTrans.Snap({
          isProduction: env.NODE_ENV === "development" ? false : true,
          serverKey:
            env.NODE_ENV === "development"
              ? env.MIDTRANS_SANDBOX_SERVER_KEY
              : env.MIDTRANS_PRODUCTION_SERVER_KEY,
          clientKey:
            env.NODE_ENV === "development"
              ? env.MIDTRANS_SANDBOX_CLIENT_KEY
              : env.MIDTRANS_PRODUCTION_CLIENT_KEY,
        });

        const parameter = {
          transaction_details: {
            order_id:
              "order-id-node-" + Math.round(new Date().getTime() / 1000),
            gross_amount: input.gross_amount,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: user.name,
            last_name: "",
            email: user.email,
          },
          item_details: [
            {
              id: Math.random().toString(36),
              price: input.gross_amount,
              quantity: 1,
              name: input.name,
              brand: "None",
              category: "Credits",
              merchant_name: "Guru AI",
              url: `${env.NEXTAUTH_URL}/buy-credits`,
            },
          ],
        };

        const transaction = await snap.createTransaction(parameter);
        const token = transaction.token;
        const clientKey = snap.apiConfig.get().clientKey;

        return {
          token,
          clientKey,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: String(error),
          cause: error,
        });
      }
    }),
  updateUserCredits: protectedProcedure
    .input(
      z.object({
        credits: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          credits: {
            increment: input.credits,
          },
        },
      });

      return { success: true };
    }),
});
