// T.O/scripts/providers/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme } from "../../constants/theme";

const ThemeCtx = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => createTheme(mode), [mode]);

  const value = useMemo(
    () => ({
      mode,
      theme,
      setMode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    }),
    [mode, theme]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
