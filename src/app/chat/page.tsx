import BoardSettings from "@/components/board-settings";
import Experience from "@/components/experience";
import Settings from "@/components/settings";
import { api } from "@/trpc/server";
import { getTranslations } from "next-intl/server";
export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const { user } = await api.user.getUser();

  const t = await getTranslations("ChatSheet");

  return (
    <main className="h-screen min-h-screen">
      <Experience credits={user?.credits ?? 52}>
        <BoardSettings>
          <Settings
            title={t("title")}
            label1={t("label1")}
            label2={t("label2")}
            label3={t("label3")}
            label4={t("label4")}
            label5={t("label5")}
            label1_description={t("label1_description")}
            label2_description={t("label2_description")}
            label3_description={t("label3_description")}
            label4_description={t("label4_description")}
            label5_description={t("label5_description")}
            label1_placeholder={t("label1_placeholder")}
            label2_placeholder={t("label2_placeholder")}
            label3_placeholder={t("label3_placeholder")}
            label4_placeholder={t("label4_placeholder")}
            label5_placeholder={t("label5_placeholder")}
            btn_text={t("btn_text")}
          />
        </BoardSettings>
      </Experience>
    </main>
  );
}
