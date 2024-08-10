import {
  checkUserCredits,
  getNewLanguageSettings,
  getSpeechLanguagePreference,
  getVersionExample,
  getWordExample,
} from "@/lib/utils";
import {
  EN_indonesiaFormalSpeechExample,
  ID_englishFormalSpeechExample,
} from "@/constants/speech-example";
import { toast } from "sonner";
import { PrismaClient, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";

jest.mock("sonner");

test("getSpeechLanguagePreference returns correct speech example", () => {
  const result = getSpeechLanguagePreference("english", "indonesia");

  expect(result.speechExample).toBe(EN_indonesiaFormalSpeechExample);

  const versionExample = getVersionExample(
    "english",
    "indonesia",
    result.speechExample,
  );
  expect(versionExample).toStrictEqual([
    { reading: "apakah", word: "Apakah" },
    { reading: "kamu", word: "Kamu" },
    { reading: "tinggal", word: "Tinggal" },
    { reading: "di", word: "Di" },
    { reading: "indonesia", word: "Indonesia" },
    { reading: "?", word: "?" },
  ]);
});

test("getNewLanguageSettings returns correct language settings", () => {
  const mockToastSuccess = jest.fn();
  const mockToastWarning = jest.fn();

  (toast.success as jest.Mock) = mockToastSuccess;
  (toast.warning as jest.Mock) = mockToastWarning;

  const result = getNewLanguageSettings("english", "indonesia");

  expect(result).toEqual({
    newFromLanguage: "english",
    newToLanguage: "indonesia",
  });
  expect(mockToastSuccess).toHaveBeenCalledWith(
    "Language settings updated successfully.",
  );

  const resultInvalid = getNewLanguageSettings("english", "english");

  expect(resultInvalid).toBeNull();
  expect(mockToastWarning).toHaveBeenCalledWith(
    "Please select different languages.",
  );
});

test("checkUserCredits updates user credits correctly", async () => {
  const db = new PrismaClient();
  const user: User = {
    id: "1",
    credits: 100,
    email: "ohQOz@example.com",
    name: "Test User",
    image: null,
    emailVerified: null,
  };

  jest.spyOn(db.user, "update").mockResolvedValue(user);

  await expect(
    checkUserCredits({ db, user, credits: 100, cost: 50 }),
  ).resolves.toBe(true);
  await expect(
    checkUserCredits({ db, user, credits: 100, cost: 150 }),
  ).rejects.toThrow(TRPCError);
});
