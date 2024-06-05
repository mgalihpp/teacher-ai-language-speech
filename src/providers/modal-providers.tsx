"use client";

import LoginModal from "@/components/login-modal";
import { memo, useEffect, useState } from "react";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <LoginModal />;
}

export default memo(ModalProvider);
