// scripts/screens/ClinicHome.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useTheme } from "../providers/ThemeContext";

export default function ClinicHome() {
  const { colors, tokens } = useTheme();

  const hasCritical = true; // depois vem do backend
  const criticalCount = 2;
  const openCount = 5;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: tokens.space.xl, gap: tokens.space.lg }}>
        <View style={{ gap: 8 }}>
          <Text style={[styles.kicker, { color: colors.text2 }]}>Olá, equipe</Text>
          <Text style={[styles.title, { color: colors.text }]}>Operação da clínica</Text>
          <Text style={[styles.subtitle, { color: colors.text2 }]}>
            Prioridades claras. Ações rápidas. Menos ruído.
          </Text>
        </View>

        {hasCritical && (
          <View style={[styles.alert, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: tokens.radius.xl }]}>
            <Text style={{ color: colors.danger, fontWeight: "900" }}>⚠️ Atenção: crises críticas</Text>
            <Text style={{ color: colors.text2, marginTop: 6 }}>
              {openCount} crises abertas • {criticalCount} em nível crítico
            </Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
              <Pressable style={[styles.primaryBtn, { backgroundColor: colors.danger, borderRadius: tokens.radius.lg }]}>
                <Text style={styles.primaryBtnText}>Abrir protocolo</Text>
              </Pressable>
              <Pressable style={[styles.secondaryBtn, { borderColor: colors.border, borderRadius: tokens.radius.lg }]}>
                <Text style={{ color: colors.text, fontWeight: "900" }}>Ver fila</Text>
              </Pressable>
            </View>
          </View>
        )}

        <Card>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Agenda de hoje</Text>

          <Row label="Atendimentos previstos" value="42" />
          <Row label="Sessões de avaliação" value="5" />
          <Row label="Rotina" value="37" />
          <Row label="Reavaliações de risco" value="3" />

          <Pressable style={[styles.secondaryBtn, { borderColor: colors.border, borderRadius: tokens.radius.lg, marginTop: 14 }]}>
            <Text style={{ color: colors.text, fontWeight: "900" }}>Abrir agenda completa</Text>
          </Pressable>
        </Card>

        <Card>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Ações rápidas</Text>

          <View style={{ marginTop: 12, flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
            <Quick label="⚡ Nova crise" desc="Abrir protocolo em segundos" />
            <Quick label="💬 Bater papo" desc="Falar com família/paciente" />
            <Quick label="📊 BI da clínica" desc="Insights e performance" />
            <Quick label="🎥 Biblioteca" desc="Treinos e materiais" />
          </View>
        </Card>
      </ScrollView>
    </View>
  );

  function Card({ children }) {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: tokens.radius.xl,
            ...tokens.shadow.card,
          },
        ]}
      >
        {children}
      </View>
    );
  }

  function Row({ label, value }) {
    return (
      <View style={{ marginTop: 10, padding: 12, borderRadius: tokens.radius.lg, backgroundColor: colors.bg2, borderWidth: 1, borderColor: colors.border, flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: colors.text2, fontWeight: "800" }}>{label}</Text>
        <Text style={{ color: colors.text, fontWeight: "900" }}>{value}</Text>
      </View>
    );
  }

  function Quick({ label, desc }) {
    return (
      <Pressable style={{ minWidth: 240, flexGrow: 1, padding: 14, borderRadius: tokens.radius.xl, backgroundColor: colors.bg2, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ color: colors.text, fontWeight: "900" }}>{label}</Text>
        <Text style={{ color: colors.text2, marginTop: 4 }}>{desc}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  kicker: { fontWeight: "900" },
  title: { fontSize: 32, fontWeight: "900" },
  subtitle: { maxWidth: 720, marginTop: 2 },

  card: { padding: 18, borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: "900" },

  alert: { padding: 18, borderWidth: 1 },

  primaryBtn: { paddingVertical: 14, paddingHorizontal: 14, alignItems: "center", flex: 1 },
  primaryBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },

  secondaryBtn: { paddingVertical: 14, paddingHorizontal: 14, alignItems: "center", borderWidth: 1, flex: 1 },
});
