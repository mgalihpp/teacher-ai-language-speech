import { groq } from "@/lib/groq";
import {
  checkUserCredits,
  getQuestion,
  getSpeechLanguagePreference,
} from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const generateRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        speech: z.enum(["casual", "formal"]),
        fromLanguage: z.enum(["indonesia", "english", "japanese"]),
        toLanguage: z.enum(["indonesia", "english", "japanese"]),
        question: z.string(),
        credits: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let user: User | null;

      const { speech, fromLanguage, toLanguage, question, credits } = input;

      if (!ctx.session?.user.id) {
        user = null;
      } else {
        user = await ctx.db.user.findFirst({
          where: {
            id: ctx.session.user.id,
          },
        });
      }

      const creditsCost = Math.ceil(question.length * 0.05);

      // checking credits for users / unauthenticated
      await checkUserCredits({
        db: ctx.db,
        user: user,
        credits: credits ?? 0,
        cost: creditsCost,
      });

      const { speechExample, versionExample, wordExample } =
        getSpeechLanguagePreference(fromLanguage, toLanguage);

      const userQuestion = getQuestion(fromLanguage, toLanguage, question);

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a ${toLanguage} Teacher. That you must asnwer the student question. Your student asks you how to say something 
                    from ${fromLanguage} to ${toLanguage}. 
                    You Should Response with:
                    - ${fromLanguage}: the ${fromLanguage.toLowerCase()} version example: "${versionExample}" 
                    - ${toLanguage}: the ${toLanguage.toLowerCase()} translation in split into words example: ${JSON.stringify(wordExample)}
                    - grammarBreakdown: an explanation of the grammar structure per sentence ex: ${JSON.stringify(
                      speechExample.grammarBreakdown,
                    )}`,
          },
          {
            role: "system",
            content: `You always respond with valid clean JSON schema like this:
              {
                "${fromLanguage.toLowerCase()}": "",
                "${toLanguage.toLowerCase()}": [{
                  "word": "",
                  "reading": ""
                }],
                "grammarBreakdown": [{
                  "${fromLanguage.toLowerCase()}": "",
                  "${toLanguage.toLowerCase()}": [{
                    "word": "",
                    "reading": ""
                  }],
                  "chunks": [{
                    "${toLanguage.toLowerCase()}": [{
                      "word": "",
                      "reading": ""
                    }],
                    "meaning": "",
                    "grammar": ""
                  }]
                }]
              }`,
          },
          {
            role: "user",
            content: `How to say ${userQuestion} In ${toLanguage} in ${speech} speech ?`,
          },
        ],
        model: "llama3-70b-8192",
        response_format: {
          type: "json_object",
        },
        temperature: 0.8,
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
