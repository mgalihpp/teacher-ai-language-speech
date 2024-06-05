import { useRouter } from "next/navigation";
import { memo } from "react";

const Credits = ({ credits }: { credits: number }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/buy-credits")}
      className="flex items-center gap-1 rounded-full 
  bg-slate-900/40 p-2 text-xs text-white max-sm:p-1"
      aria-label="Credits"
      aria-current="page"
    >
      <span>{credits}</span>
      <span>Credits</span>
    </button>
  );
};

export default memo(Credits);
