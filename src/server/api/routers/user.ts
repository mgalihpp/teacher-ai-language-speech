import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    let user;

    if (ctx.session) {
      user = await ctx.db.user.findFirst({
        where: {
          id: ctx.session?.user.id,
        },
      });
    }

    if (!user) {
      return { session: ctx.session, user: null };
    }

    return { session: ctx.session, user };
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
