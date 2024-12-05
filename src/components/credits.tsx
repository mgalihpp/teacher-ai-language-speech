import Link from "next/link";
import { memo } from "react";

const Credits = ({ credits }: { credits: number }) => {
  return (
    <Link
      href="/buy-credits"
      className="flex items-center gap-1 rounded-full 
  bg-slate-900/40 p-2 text-xs text-white max-sm:p-1"
      aria-label="Credits"
      aria-current="page"
    >
      <span>{credits}</span>
      <span>Credits</span>
    </Link>
  );
};

export default memo(Credits);
