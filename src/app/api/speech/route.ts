import { type NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: env.ASSEMBLYAI_KEY,
});
import { env } from "@/env";

cloudinary.config({
  cloud_name: "dfr6m4wvx",
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

/**
 * @deprecated This function is deprecated and may be removed in future versions.
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.blob();
  const contentType = req.headers.get("Content-Type");

  const arrayBuffer = await body.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const dataUri = `data:${contentType};base64,${buffer.toString("base64")}`;

  try {
    const res = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
    });

    // Transcript the audio
    const transcript = await client.transcripts.transcribe({
      audio_url: res.secure_url,
    });

    return NextResponse.json(transcript, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
