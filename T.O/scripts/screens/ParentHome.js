// scripts/screens/ParentHome.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useTheme } from "../providers/ThemeContext";

export default function ParentHome() {
  const { colors, tokens } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: tokens.space.xl, gap: tokens.space.lg }}>
        <View style={{ gap: 8 }}>
          <Text style={[styles.kicker, { color: colors.text2 }]}>Olá, família</Text>
          <Text style={[styles.title, { color: colors.text }]}>Jornada de hoje</Text>
          <Text style={[styles.subtitle, { color: colors.text2 }]}>
            Pequenos passos. Rotina leve. Registro simples.
          </Text>
        </View>

        <Card>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Foco de hoje</Text>
          <Text style={[styles.cardP, { color: colors.text2 }]}>
            Reserve um momento tranquilo para uma atividade curta e leve. A ideia é criar uma experiência positiva.
          </Text>

          <View style={{ marginTop: 12, padding: 14, borderWidth: 1, borderColor: colors.border, borderRadius: tokens.radius.lg, backgroundColor: colors.bg2 }}>
            <Text style={{ color: colors.text, fontWeight: "900" }}>🎯 Brincadeira de turnos com bola</Text>
            <Text style={{ color: colors.text2, marginTop: 4 }}>
              10–15 min • comunicação + troca de olhares
            </Text>
          </View>

          <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary, borderRadius: tokens.radius.lg }]}>
            <Text style={styles.primaryBtnText}>Registrar como foi</Text>
          </Pressable>
        </Card>

        <Card>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Próximo encontro com a clínica</Text>
          <Text style={{ color: colors.text2, marginTop: 6 }}>Hoje, 16:00 • Sessão T.O • 45 minutos</Text>

          <Pressable style={[styles.secondaryBtn, { borderColor: colors.border, borderRadius: tokens.radius.lg }]}>
            <Text style={{ color: colors.text, fontWeight: "900" }}>Falar com a clínica</Text>
          </Pressable>
        </Card>

        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Evolução</Text>
            <Text style={{ color: colors.primary, fontWeight: "900" }}>Ver BI →</Text>
          </View>

          <Text style={[styles.cardP, { color: colors.text2 }]}>
            Acompanhe tendências semanais e entenda o que está melhorando (sem números confusos).
          </Text>

          <View style={{ marginTop: 10, padding: 14, borderRadius: tokens.radius.lg, backgroundColor: colors.bg2, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.text, fontWeight: "900" }}>📈 Leitura rápida</Text>
            <Text style={{ color: colors.text2, marginTop: 4 }}>
              Nas últimas semanas, houve evolução em comunicação e autonomia. Mantendo rotina, a consistência faz diferença.
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Conteúdos rápidos</Text>
          <Text style={[styles.cardP, { color: colors.text2 }]}>
            Vídeos curtinhos com ideias práticas para o dia a dia.
          </Text>

          <MiniItem title="Preparar a criança para sessão" />
          <MiniItem title="Como agir em um momento de crise" />
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

  function MiniItem({ title }) {
    return (
      <View style={{ marginTop: 12, padding: 14, borderRadius: tokens.radius.lg, backgroundColor: colors.bg2, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ color: colors.text, fontWeight: "900" }}>🎬 {title}</Text>
        <Text style={{ color: colors.text2, marginTop: 4 }}>2–4 min • prático e direto</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  kicker: { fontWeight: "900" },
  title: { fontSize: 32, fontWeight: "900" },
  subtitle: { maxWidth: 720, marginTop: 2 },

  card: { padding: 18, borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: "900" },
  cardP: { marginTop: 6, lineHeight: 20 },

  primaryBtn: { marginTop: 14, paddingVertical: 14, alignItems: "center" },
  primaryBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },

  secondaryBtn: { marginTop: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1 },
});
