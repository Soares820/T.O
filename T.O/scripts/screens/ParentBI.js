// T.O/scripts/screens/ParentBI.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTheme } from "../providers/ThemeContext";
import ToggleTheme from "../../components/ToggleTheme";

export default function ParentBI({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme.name === "dark";

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* HEADER */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.surfaceSoft },
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backText, { color: theme.textSoft }]}>
              ← Voltar
            </Text>
          </TouchableOpacity>

          <ToggleTheme />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          BI de evolução – Família
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSoft }]}>
          Visão simples da evolução da criança ao longo dos últimos meses.
        </Text>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* KPIs */}
        <View style={styles.kpiRow}>
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.kpiLabel, { color: theme.textSoft }]}>
              Evolução geral
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              72%
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.success }]}>
              +18% vs. mês passado
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.kpiLabel, { color: theme.textSoft }]}>
              Comunicação
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              78%
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.textSoft }]}>
              Mais pedidos espontâneos e interação nas brincadeiras
            </Text>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.kpiLabel, { color: theme.textSoft }]}>
              Autonomia
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              65%
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.textSoft }]}>
              Participa mais nas rotinas da casa
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.kpiLabel, { color: theme.textSoft }]}>
              Crises no mês
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              3
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.success }]}>
              Redução de 40% vs. mês anterior
            </Text>
          </View>
        </View>

        {/* “GRÁFICO” SIMPLIFICADO */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Linha do tempo (últimos 4 meses)
          </Text>
          <View style={styles.timeline}>
            {["Ago", "Set", "Out", "Nov"].map((mes, index) => (
              <View style={styles.timelineItem} key={mes}>
                <View
                  style={[
                    styles.timelineBar,
                    {
                      height: 40 + index * 10,
                      backgroundColor: theme.accentSoft,
                    },
                  ]}
                />
                <Text
                  style={[styles.timelineLabel, { color: theme.textSoft }]}
                >
                  {mes}
                </Text>
              </View>
            ))}
          </View>
          <Text style={[styles.cardText, { color: theme.textSoft }]}>
            A cada mês, a clínica registra os avanços nas áreas de comunicação,
            autonomia e interação social para compor este indicador sintético.
          </Text>
        </View>

        {/* OBSERVAÇÃO */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Como ler este BI em família?
          </Text>
          <Text style={[styles.cardText, { color: theme.textSoft }]}>
            Use estes números como um guia de conversa com a clínica, não como
            cobrança sobre a criança ou sobre vocês. O mais importante é
            perceber tendências e celebrar os pequenos avanços do dia a dia.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: { fontSize: 13 },
  title: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 12, marginTop: 4 },
  body: { flex: 1 },

  kpiRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  kpiCard: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
  },
  kpiLabel: { fontSize: 11 },
  kpiValue: { fontSize: 20, fontWeight: "700", marginTop: 4 },
  kpiExtra: { fontSize: 11, marginTop: 4 },

  card: {
    borderRadius: 18,
    marginTop: 18,
    padding: 14,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  cardText: { fontSize: 12 },

  timeline: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  timelineItem: {
    alignItems: "center",
    flex: 1,
  },
  timelineBar: {
    width: "70%",
    borderRadius: 999,
  },
  timelineLabel: { fontSize: 11, marginTop: 4 },
});
