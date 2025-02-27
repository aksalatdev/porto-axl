"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-muted/80 transition-colors"
    >
      <div className="relative w-[1.2rem] h-[1.2rem]">
        <Sun 
          className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
          aria-hidden="true"
        />
        <Moon 
          className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}