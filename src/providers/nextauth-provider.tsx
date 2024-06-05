"use client";

import { SessionProvider } from "next-auth/react";

function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
