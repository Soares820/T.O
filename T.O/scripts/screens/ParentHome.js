import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../providers/ThemeContext";

// ✅ background (pais) - caminho correto a partir de scripts/screens
import bgParent from "../../assets/images/Imagem-TEA.webp";

function StatCard({ title, value, subtitle, theme }) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 220,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing(2),
        ...theme.shadow,
      }}
    >
      <Text style={{ color: theme.colors.mutedText, ...theme.fonts.regular }}>{title}</Text>
      <Text style={{ color: theme.colors.text, fontSize: 28, marginTop: 6, ...theme.fonts.heavy }}>{value}</Text>
      {!!subtitle && <Text style={{ color: theme.colors.mutedText, marginTop: 6 }}>{subtitle}</Text>}
    </View>
  );
}

function RowCard({ title, desc, right, theme }) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing(2),
        ...theme.shadow,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.text, fontSize: 16, ...theme.fonts.bold }}>{title}</Text>
          {!!desc && <Text style={{ color: theme.colors.mutedText, marginTop: 6 }}>{desc}</Text>}
        </View>
        {right ? right : null}
      </View>
    </View>
  );
}

function MiniChip({ label, theme }) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: "transparent",
      }}
    >
      <Text style={{ color: theme.colors.mutedText, fontSize: 12 }}>{label}</Text>
    </View>
  );
}

export default function ParentHome(props) {
  const navigation = props?.navigation || useNavigation();
  const { theme, mode, toggle } = useTheme();
  const { width } = useWindowDimensions();

  const isMobile = width < 900;
  const isSmallPhone = width < 380;

  const page = useMemo(
    () => ({
      flex: 1,
      backgroundColor: "transparent",
    }),
    []
  );

  const content = useMemo(
    () => ({
      padding: isSmallPhone ? theme.spacing(2) : isMobile ? theme.spacing(2.5) : theme.spacing(3),
      gap: theme.spacing(2),
      maxWidth: 1180,
      width: "100%",
      alignSelf: "center",
      paddingBottom: theme.spacing(6),
    }),
    [theme, isMobile, isSmallPhone]
  );

  const topRow = useMemo(
    () => ({
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    }),
    []
  );

  const grid = useMemo(
    () => ({
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing(2),
    }),
    [theme]
  );

  const kpiGrid = useMemo(
    () => ({
      flexDirection: isMobile ? "column" : "row",
      gap: theme.spacing(2),
    }),
    [isMobile, theme]
  );

  function logout() {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <ImageBackground source={bgParent} resizeMode="cover" style={{ flex: 1 }}>
      {/* overlay para contraste e leitura */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: mode === "dark" ? "rgba(8,12,20,0.75)" : "rgba(255,255,255,0.70)",
        }}
      />

      <ScrollView style={page} contentContainerStyle={content}>
        {/* Header */}
        <View style={topRow}>
          <View style={{ flex: 1, minWidth: 260 }}>
            <Text style={{ color: theme.colors.mutedText }}>Olá, família</Text>
            <Text style={{ color: theme.colors.text, fontSize: 28, marginTop: 4, ...theme.fonts.heavy }}>
              Jornada do(a) seu(sua) filho(a)
            </Text>
            <Text style={{ color: theme.colors.mutedText, marginTop: 6 }}>
              Acompanhe atividades, registros de momentos e evolução — com insights claros.
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Pressable
              onPress={() => navigation.navigate("BIParent")}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              }}
            >
              <Text style={{ color: theme.colors.text, ...theme.fonts.medium }}>Ver BI de evolução →</Text>
            </Pressable>

            <Pressable
              onPress={toggle}
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: theme.colors.border,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.card,
              }}
            >
              <Text style={{ color: theme.colors.text }}>{mode === "dark" ? "🌙" : "☀️"}</Text>
            </Pressable>

            <Pressable
              onPress={logout}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              }}
            >
              <Text style={{ color: theme.colors.text, ...theme.fonts.medium }}>Sair</Text>
            </Pressable>
          </View>
        </View>

        {/* KPIs */}
        <View style={kpiGrid}>
          <StatCard title="Progresso do mês" value="72%" subtitle="Boa evolução em rotina e comunicação 💙" theme={theme} />
          <StatCard title="Comunicação" value="+18%" subtitle="comparado ao mês passado" theme={theme} />
          <StatCard title="Autonomia" value="+9%" subtitle="nas últimas semanas" theme={theme} />
        </View>

        {/* Hoje */}
        <View style={{ gap: theme.spacing(2) }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <View>
              <Text style={{ color: theme.colors.text, fontSize: 18, ...theme.fonts.bold }}>Atividades de hoje</Text>
              <Text style={{ color: theme.colors.mutedText, marginTop: 4 }}>Sugestões da clínica para fazer em casa.</Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate("CrisisForm")}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 14,
                backgroundColor: theme.colors.card,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <Text style={{ color: theme.colors.text, ...theme.fonts.medium }}>Registrar momento importante</Text>
            </Pressable>
          </View>

          <View style={grid}>
            <RowCard theme={theme} title="Rotina sensorial da manhã" desc="10–15 min • Hoje" right={<MiniChip label="✅ recomendado" theme={theme} />} />
            <RowCard theme={theme} title="Brincadeira de turnos com bola" desc="15 min • Hoje" right={<MiniChip label="🎯 foco" theme={theme} />} />
            <RowCard theme={theme} title="História com figuras" desc="8 min • Amanhã" right={<MiniChip label="📅 agendado" theme={theme} />} />
          </View>
        </View>

        {/* Próxima sessão */}
        <RowCard
          theme={theme}
          title="Próximo encontro com a clínica"
          desc="Hoje, 16:00 • Sessão T.O • 45 minutos"
          right={
            <Pressable
              onPress={() => navigation.navigate("Chat")}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 999,
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text style={{ color: "#fff", ...theme.fonts.bold }}>Falar com a clínica</Text>
            </Pressable>
          }
        />

        {/* Conteúdos */}
        <View style={{ gap: theme.spacing(2) }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <View>
              <Text style={{ color: theme.colors.text, fontSize: 18, ...theme.fonts.bold }}>Conteúdos rápidos</Text>
              <Text style={{ color: theme.colors.mutedText, marginTop: 4 }}>Vídeos curtinhos com ideias práticas.</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("Videos")}>
              <Text style={{ color: theme.colors.primary, ...theme.fonts.medium }}>Ver todos →</Text>
            </Pressable>
          </View>

          <View style={grid}>
            <RowCard theme={theme} title="Como preparar a criança para a sessão" desc="2 min • checklist simples" />
            <RowCard theme={theme} title="Estratégias para momentos de crise em casa" desc="3 min • guia prático" />
            <RowCard theme={theme} title="Brincadeiras que estimulam autonomia" desc="4 min • passo a passo" />
          </View>
        </View>

        <Text style={{ color: theme.colors.mutedText, textAlign: "center", marginTop: theme.spacing(2) }}>
          {Platform.OS === "web" ? "Web" : "Mobile"} • T.O
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}

// ✅ precisa disso por causa do overlay absolute
import { StyleSheet } from "react-native";
