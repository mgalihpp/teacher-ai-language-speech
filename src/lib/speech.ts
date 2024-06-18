import { env } from "@/env";

interface ApiSpeechOptions {
  language: LanguageOptions;
  speech: SpeechOptions;
}

interface Options {
  method: "POST";
  headers: HeadersInit;
  body: BodyInit;
}

interface BodyPayload {
  Text: string;
  VoiceId: string;
}

class SpeechApi {
  language: LanguageOptions;
  speech: SpeechOptions;

  static UNREAL_SPEECH_API_URL = "https://api.v7.unrealspeech.com/stream";
  static ELEVENLABS_SPEECH_API_URL =
    "https://api.elevenlabs.io/v1/text-to-speech";

  static ELEVENLABS_SPEECH_API_KEY = env.NEXT_PUBLIC_ELEVENLABS_SPEECH_API_KEY;

  static UNREAL_SPEECH_API_KEY = env.NEXT_PUBLIC_UNREAL_SPEECH_API_KEY;

  constructor({
    language = "english",
    speech = { unreal: true },
  }: ApiSpeechOptions) {
    this.language = language;
    this.speech = speech;

    this.set({ language, speech });
  }

  set(options: ApiSpeechOptions) {
    this.language = options.language;
    this.speech = options.speech;
  }

  getUnrealSpeechApiUrl() {
    return SpeechApi.UNREAL_SPEECH_API_URL;
  }

  getElevenLabsSpeechApiUrl() {
    return SpeechApi.ELEVENLABS_SPEECH_API_URL;
  }

  request<T>(
    httpMethod: "POST",
    headers: HeadersInit,
    requestUrl: string,
    body: BodyInit,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(requestUrl, {
        method: httpMethod,
        headers,
        body,
      })
        .then((res) => res.blob())
        .then((data) => resolve(data as T))
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAudio(body: BodyPayload): Promise<Blob> {
    const apiUrl =
      this.language === "english"
        ? this.getUnrealSpeechApiUrl()
        : `${SpeechApi.ELEVENLABS_SPEECH_API_URL}/${body.VoiceId}`;

    let options: Options;

    if (this.speech.unreal) {
      options = {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${SpeechApi.UNREAL_SPEECH_API_KEY}`,
        },
        body: JSON.stringify(body),
      };
    } else {
      options = {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": `${SpeechApi.ELEVENLABS_SPEECH_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: body.Text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 1,
            similarity_boost: 1,
            use_speaker_boost: true,
          },
        }),
      };
    }

    return this.request("POST", options.headers, apiUrl, options.body);
  }
}

export default SpeechApi;
