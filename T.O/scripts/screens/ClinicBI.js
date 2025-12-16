// T.O/scripts/screens/ClinicBI.js
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

export default function ClinicBI({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme.name === "dark";

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

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
          BI de evolução – Clínica
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSoft }]}>
          Indicadores para gestão da clínica T.o e acompanhamento da carteira
          de pacientes.
        </Text>
      </View>

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
              Pacientes ativos
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              128
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.textSoft }]}>
              +12 nos últimos 3 meses
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.kpiLabel, { color: theme.textSoft }]}>
              Evolução média global
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              68%
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.success }]}>
              +9 pontos vs. semestre anterior
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
              Crises no mês
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              14
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.textSoft }]}>
              70% com resposta &lt; 5 min
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.kpiLabel, { color: theme.textSoft }]}>
              Taxa de comparecimento
            </Text>
            <Text style={[styles.kpiValue, { color: theme.text }]}>
              91%
            </Text>
            <Text style={[styles.kpiExtra, { color: theme.success }]}>
              Melhorou após lembretes automáticos
            </Text>
          </View>
        </View>

        {/* “GRÁFICO” SIMPLIFICADO – carga da equipe */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Carga de atendimentos por terapeuta (amostra)
          </Text>
          {[
            { nome: "Dra. Ana", valor: 80 },
            { nome: "Dr. João", valor: 65 },
            { nome: "Dra. Beatriz", valor: 50 },
          ].map((t) => (
            <View key={t.nome} style={styles.barRow}>
              <Text
                style={[styles.barLabel, { color: theme.textSoft }]}
              >
                {t.nome}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${t.valor}%`,
                      backgroundColor: theme.accentSoft,
                    },
                  ]}
                />
              </View>
              <Text
                style={[styles.barValue, { color: theme.textSoft }]}
              >
                {t.valor}%
              </Text>
            </View>
          ))}
        </View>

        {/* OBSERVAÇÕES */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Como usar este BI na gestão?
          </Text>
          <Text style={[styles.cardText, { color: theme.textSoft }]}>
            • Use os indicadores de evolução para ajustar carga e prioridades
            entre terapeutas.{"\n"}
            • Observe a relação entre crises, comparecimento e evolução.{"\n"}
            • Combine estes dados com feedback qualitativo das famílias para
            decisões de equipe.
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

  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  barLabel: { fontSize: 12, width: 80 },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(148, 163, 184, 0.3)",
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 999,
  },
  barValue: { fontSize: 11, width: 40, textAlign: "right" },
});
