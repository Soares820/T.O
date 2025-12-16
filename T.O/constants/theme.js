// T.O/constants/theme.js
export function createTheme(mode = "light") {
  const isDark = mode === "dark";

  const colors = {
    mode,
    primary: isDark ? "#4FC3F7" : "#007AFF",
    background: isDark ? "#0B1220" : "#F6F9FC",
    card: isDark ? "#111A2E" : "#FFFFFF",
    text: isDark ? "#EAF0FF" : "#0B1220",
    mutedText: isDark ? "#AAB6D6" : "#5C6B8A",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(16,24,40,0.08)",
    danger: "#FF4D4F",
    warning: "#FAAD14",
    success: "#22C55E",
  };

  // ✅ React Navigation v7 espera `fonts` com pelo menos regular/medium/bold/heavy
  const fonts = {
    regular: { fontFamily: "System", fontWeight: "400" },
    medium: { fontFamily: "System", fontWeight: "600" },
    bold: { fontFamily: "System", fontWeight: "700" },
    heavy: { fontFamily: "System", fontWeight: "800" },
  };

  const spacing = (n) => n * 8;

  const radius = {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
  };

  const shadow = isDark
    ? {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
      }
    : {
        shadowColor: "#0B1220",
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 2,
      };

  return { colors, fonts, spacing, radius, shadow };
    }