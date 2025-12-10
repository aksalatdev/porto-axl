"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SplashContextType {
  isSplashComplete: boolean;
  setSplashComplete: () => void;
}

const SplashContext = createContext<SplashContextType>({
  isSplashComplete: false,
  setSplashComplete: () => {},
});

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const setSplashComplete = useCallback(() => {
    setIsSplashComplete(true);
  }, []);

  return (
    <SplashContext.Provider value={{ isSplashComplete, setSplashComplete }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  return useContext(SplashContext);
}
