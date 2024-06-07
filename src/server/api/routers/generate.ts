/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { formalSpeechExample } from "@/constants";
import { groq } from "@/lib/groq";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { PrismaClient, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

async function checkUserCredits({
  db,
  user,
  credits,
}: {
  db: PrismaClient;
  user: User | null | undefined;
  credits: number;
}) {
  if (!user) {
    if (credits <= 0) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have enough credits",
      });
    }

    return true;
  } else {
    if (user.credits <= 0) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have enough credits",
      });
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        credits: user.credits - 1,
      },
    });

    return true;
  }
}

export const generateRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        speech: z.enum(["casual", "formal"]),
        question: z.string(),
        credits: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          id: ctx.session?.user?.id,
        },
      });

      // checking credits for users / unauthenticated
      await checkUserCredits({
        db: ctx.db,
        user: user,
        credits: input.credits ?? 0,
      });

      const speechExample =
        input.speech === "formal" ? formalSpeechExample : formalSpeechExample;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a English Teacher. That you must asnwer the student question. Your student asks you how to say something 
                    from Bahasa Indonesia to English. You Should Response with:
                    - Bahasa Indonesia: the bahasa version example: "Apakah kamu tinggal di Indonesia ?" 
                    - English: the english version, example: ${speechExample}`,
          },
          {
            role: "system",
            content: `You must reply to this question: ${input.question}. 
            Translate it to English with good grammar and always respond with 
            JSON format like this:
              {
                "indonesia": "",
                "english": [{
                  "word": "",
                  "reading": ""
                }],
                "grammarBreakdown": [{
                  "indonesia": "",
                  "english": [{
                    "word": "",
                    "reading": ""
                  }],
                  "chunks": [{
                    "english": [{
                      "word": "",
                      "reading": ""
                    }],
                    "meaning": "",
                    "grammar": ""
                  }]
                }]
              }`,
          },
        ],

        model: "mixtral-8x7b-32768",
        response_format: {
          type: "json_object",
        },
        temperature: 0.2,
      });

      if (!chatCompletion.choices[0]?.message.content) {
        if (user) {
          await ctx.db.user.update({
            where: {
              id: user?.id,
            },
            data: {
              credits: user?.credits + 1,
            },
          });
        }

        throw new TRPCError({
          message: "Failed to get Ai Response, Please try again later!",
          code: "BAD_REQUEST",
        });
      }

      return chatCompletion.choices[0].message.content;
    }),
});
