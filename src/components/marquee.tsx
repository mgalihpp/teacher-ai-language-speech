import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: "fast" | "normal" | "slow";
  [key: string]: unknown;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "normal",
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        `group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]`,
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "[--duration:40s]": duration === "normal",
          "[--duration:20s]": duration === "fast",
          "[--duration:50s]": duration === "slow",
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
