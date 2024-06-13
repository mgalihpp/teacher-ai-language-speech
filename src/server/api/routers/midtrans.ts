import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import MidTrans from "@/lib/midtrans/midtrans";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
        const SERVER_KEY = "SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA";
        const CLIENT_KEY = "SB-Mid-client-61XuGAwQ8Bj8LxSS";
        const user = ctx.session.user;

        const snap = new MidTrans.Snap({
          isProduction: false,
          serverKey: SERVER_KEY,
          clientKey: CLIENT_KEY,
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
              url: "http://localhost:3000/buy-credits",
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
            // increment the current credits value by the input value
            increment: input.credits,
          },
        },
      });

      return { success: true };
    }),
});
