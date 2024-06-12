import Experience from "@/components/experience";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function ChatPage() {
  const session = await getServerAuthSession();

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      credits: true,
    },
  });

  return (
    <main className="h-screen min-h-screen">
      <Experience credits={user?.credits ?? 52} />
    </main>
  );
}
