"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className }: { className?: string }) {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="transparent"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`transition-all duration-75 ease-in-out hover:bg-black/10 ${
        theme === "dark" ? "scale-100" : "scale-95"
      } ${className}`}
      size="icon"
      aria-label="Toggle theme"
      name="Toggle theme"
    >
      <div
        className={`transform transition-transform duration-500 ease-in-out ${
          theme === "dark" ? "rotate-180" : ""
        }`}
      >
        {theme === "light" ? (
          <Moon className="size-5" />
        ) : (
          <Sun className="size-5" />
        )}
      </div>
    </Button>
  );
}
