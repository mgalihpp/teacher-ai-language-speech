import { env } from "@/env";
import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});
