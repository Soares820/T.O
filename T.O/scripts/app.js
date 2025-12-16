// T.O/scripts/app.js
import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import ParentHome from "./screens/ParentHome";
import ClinicHome from "./screens/ClinicHome";

import { ThemeProvider, useTheme } from "./providers/ThemeContext";

const Stack = createNativeStackNavigator();

function AppNav() {
  const { mode, theme } = useTheme();

  const base = mode === "dark" ? DarkTheme : DefaultTheme;

  // ✅ Tema compatível com RN Navigation v7 + suas cores
  const navTheme = {
    ...base,
    dark: mode === "dark",
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
    // ✅ IMPORTANTE: adiciona fonts.medium etc
    fonts: theme.fonts,
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleStyle: {
            // ✅ usa fonte existente
            ...theme.fonts.medium,
          },
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ParentHome" component={ParentHome} options={{ title: "Família" }} />
        <Stack.Screen name="ClinicHome" component={ClinicHome} options={{ title: "Clínica" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNav />
    </ThemeProvider>
  );
}
