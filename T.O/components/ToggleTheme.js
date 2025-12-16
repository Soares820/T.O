// components/ToggleTheme.js
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../scripts/providers/ThemeContext";

export default function ToggleTheme() {
  const { mode, toggle, colors, tokens } = useTheme();

  return (
    <Pressable onPress={toggle} style={[styles.wrap, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: tokens.radius.lg }]}>
      <View style={[styles.dot, { backgroundColor: mode === "dark" ? colors.primary : colors.primary2 }]} />
      <Text style={{ color: colors.text, fontWeight: "700" }}>
        {mode === "dark" ? "Noite" : "Claro"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
});
