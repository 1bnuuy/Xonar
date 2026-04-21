"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { ToggleContextType } from "./type";

const UIContext = createContext<ToggleContextType | undefined>(undefined);
export const useUI = (): ToggleContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
};

export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [audio, setAudio] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 768px)");
  //   setIsMobile(mediaQuery.matches);

  //   const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
  //   mediaQuery.addEventListener("change", handler);
  //   return () => mediaQuery.removeEventListener("change", handler);
  // }, []);

  const toggleAudio = () => {
    setAudio(!audio);
  };

  const value = useMemo(
    () => ({
      audio,
      toggleAudio,
    }),
    [audio],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
