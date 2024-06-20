import { groq } from "@/lib/groq";
import { checkUserCredits, getSpeechLanguagePreference } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const generateRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        speech: z.enum(["casual", "formal"]),
        language: z.enum(["indonesia", "english"]),
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

      const speechExample = getSpeechLanguagePreference(input.language);

      const fromLanguage =
        input.language === "indonesia" ? "Indonesia" : "English";
      const toLanguage =
        input.language === "indonesia" ? "English" : "Indonesia";

      const versionExample =
        input.language === "indonesia"
          ? (speechExample.grammarBreakdown[0]?.english as string)
          : (speechExample.grammarBreakdown[0]?.indonesia as string);

      const wordExample =
        input.language === "indonesia"
          ? speechExample.english
          : speechExample.indonesia;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a English Teacher. That you must asnwer the student question. Your student asks you how to say something 
                    from ${fromLanguage} to ${toLanguage}. 
                    You Should Response with:
                    - ${fromLanguage}: the ${fromLanguage.toLocaleLowerCase()} version example: "${versionExample}" 
                    - ${toLanguage}: the ${toLanguage.toLocaleLowerCase()} translation in split into words example: ${JSON.stringify(wordExample)}
                    - grammarBreakdown: an explanation of the grammar structure per sentence ex: ${JSON.stringify(
                      speechExample.grammarBreakdown,
                    )}`,
          },
          {
            role: "system",
            content: `You always respond with JSON format like this:
              {
                "${fromLanguage.toLocaleLowerCase()}": "",
                "${toLanguage.toLocaleLowerCase()}": [{
                  "word": "",
                  "reading": ""
                }],
                "grammarBreakdown": [{
                  "${fromLanguage.toLocaleLowerCase()}": "",
                  "${toLanguage.toLocaleLowerCase()}": [{
                    "word": "",
                    "reading": ""
                  }],
                  "chunks": [{
                    "${toLanguage.toLocaleLowerCase()}": [{
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
            content: `How to say ${
              input.question === ""
                ? input.language === "indonesia"
                  ? "Apakah kamu tinggal di Indonesia ?"
                  : "Do you live in Indonesia ?"
                : input.question
            } 
            In ${toLanguage} in ${input.speech} speech ?`,
          },
        ],

        model: "llama3-8b-8192",
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
