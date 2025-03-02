"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create theme context
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  // Mount component
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always dark mode
  const theme = "dark";

  // No-op function as toggle (doesn't actually change anything)
  const toggleTheme = () => {
    // This function doesn't do anything anymore
    // Dark mode is always enforced
    return;
  };

  // Only provide context after mounted to avoid hydration issues
  const value = mounted
    ? { theme, toggleTheme }
    : { theme: "dark", toggleTheme: () => {} };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
