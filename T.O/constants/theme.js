// constants/theme.js
export const tokens = {
  radius: {
    xs: 10,
    sm: 14,
    md: 18,
    lg: 22,
    xl: 28,
  },
  space: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 36,
  },
  shadow: {
    card: {
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
      elevation: 2,
    },
  },
};

export const lightTheme = {
  mode: "light",
  colors: {
    bg: "#F6F9FF",
    bg2: "#EEF5FF",
    card: "#FFFFFF",
    text: "#0B1220",
    text2: "#516074",
    border: "#E6EEF9",
    primary: "#2F6BFF",
    primary2: "#77A6FF",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    chip: "#EAF2FF",
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    bg: "#070A12",
    bg2: "#0B1020",
    card: "#0D1428",
    text: "#EAF1FF",
    text2: "#9FB0CC",
    border: "#1B2A4A",
    primary: "#4B85FF",
    primary2: "#8FB2FF",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    chip: "#0F1B33",
  },
};
