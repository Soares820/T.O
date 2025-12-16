// scripts/app.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./navigation/AppNavigator";
import { ThemeProvider, useTheme } from "./providers/ThemeContext";
import { AuthProvider } from "./providers/AuthContext";

function Nav() {
  const { colors, mode } = useTheme();

  const navTheme = {
    dark: mode === "dark",
    colors: {
      primary: colors.primary,
      background: colors.bg,
      card: colors.bg,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Nav />
      </AuthProvider>
    </ThemeProvider>
  );
}
