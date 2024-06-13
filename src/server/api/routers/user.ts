import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
});
