"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mount component (fixes hydration issues)
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, render empty button to avoid layout shift
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10 opacity-0"
        aria-label="Theme toggle"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-transparent hover:bg-gray-200/10 dark:hover:bg-gray-800/20 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
