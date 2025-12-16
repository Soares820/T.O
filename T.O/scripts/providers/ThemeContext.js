// scripts/providers/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from "react";
import { darkTheme, lightTheme, tokens } from "../../constants/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light"); // troca pra "dark" se quiser iniciar escuro

  const theme = useMemo(() => {
    const base = mode === "dark" ? darkTheme : lightTheme;
    return { ...base, tokens };
  }, [mode]);

  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const setDark = () => setMode("dark");
  const setLight = () => setMode("light");

  return (
    <ThemeContext.Provider value={{ ...theme, toggle, setDark, setLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
