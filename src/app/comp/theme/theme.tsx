"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ThemeContextTypes } from "./types";

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);
export const useTheme = (): ThemeContextTypes => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ThemeDark, setTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  const ThemeToggle = () => {
    const newTheme = !ThemeDark;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) setTheme(storedTheme === "dark");

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        setTheme(e.newValue === "dark");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ ThemeDark, ThemeToggle }}>
      <main
        className={`${ThemeDark && "dark"} bg-primary grid-background dark:bg-primary-dark min-h-dvh w-full overflow-hidden`}
      >
        {children}
      </main>
    </ThemeContext.Provider>
  );
}
