'use client';

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full w-10 h-10 bg-transparent hover:bg-gray-200/10 dark:hover:bg-gray-800/20 flex items-center justify-center opacity-0"
        aria-label="Loading theme toggle"
      >
        <div className="h-5 w-5" />
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
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      )}
    </Button>
  );
}