import Experience from "@/components/experience";
import { api } from "@/trpc/server";
export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const { user } = await api.user.getUser();

  return (
    <main className="h-screen min-h-screen">
      <Experience credits={user?.credits ?? 52} />
    </main>
  );
}
