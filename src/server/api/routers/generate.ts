/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { formalSpeechExample } from "@/constants";
import { groq } from "@/lib/groq";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const generateRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        speech: z.enum(["casual", "formal"]),
        question: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const speechExample =
        input.speech === "formal" ? formalSpeechExample : formalSpeechExample;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a English Teacher. That you must asnwer 
                    the student question. Your student asks you how to say something 
                    from Bahasa Indonesia to English. You Should Response with:
                    - Bahasa Indonesia: the bahasa version ex: "Apakah kamu tinggal di Indonesia ?" 
                    - English: the english version ex: ${speechExample}`,
          },
          {
            role: "system",
            content: `you must replies this question ${input.question} and translate it to english with good grammar and you always reponse with JSON object : 
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

        model: "llama3-8b-8192",
        response_format: {
          type: "json_object",
        },
      });

      if (!chatCompletion.choices[0]?.message.content) {
        throw new TRPCError({
          message: "Failed to get Ai Response, Please try again later!",
          code: "BAD_REQUEST",
        });
      }

      return chatCompletion.choices[0].message.content;
    }),
});
