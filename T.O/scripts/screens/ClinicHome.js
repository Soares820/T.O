import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../providers/ThemeContext";

// ✅ background (clínica) - caminho correto a partir de scripts/screens
import bgClinic from "../../assets/images/Imagem-TEA2.webp";

function StatPill({ label, theme }) {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
      }}
    >
      <Text style={{ color: theme.colors.mutedText, fontSize: 12 }}>{label}</Text>
    </View>
  );
}

function Panel({ title, subtitle, children, theme }) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing(2),
        ...theme.shadow,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 18, ...theme.fonts.bold }}>{title}</Text>
      {!!subtitle && <Text style={{ color: theme.colors.mutedText, marginTop: 6 }}>{subtitle}</Text>}
      <View style={{ marginTop: theme.spacing(2), gap: theme.spacing(1) }}>{children}</View>
    </View>
  );
}

function Item({ title, desc, tone = "default", theme }) {
  const dot =
    tone === "danger" ? theme.colors.danger : tone === "warning" ? theme.colors.warning : theme.colors.primary;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ width: 10, height: 10, borderRadius: 99, backgroundColor: dot }} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.colors.text, ...theme.fonts.medium }}>{title}</Text>
        {!!desc && <Text style={{ color: theme.colors.mutedText, marginTop: 2 }}>{desc}</Text>}
      </View>
    </View>
  );
}

export default function ClinicHome(props) {
  const navigation = props?.navigation || useNavigation();
  const { theme, mode, toggle } = useTheme();
  const { width } = useWindowDimensions();

  const isMobile = width < 900;
  const isSmallPhone = width < 380;

  const page = useMemo(() => ({ flex: 1, backgroundColor: "transparent" }), []);
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

  const topRow = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  };

  const twoCol = {
    flexDirection: isMobile ? "column" : "row",
    gap: theme.spacing(2),
  };

  function logout() {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <ImageBackground source={bgClinic} resizeMode="cover" style={{ flex: 1 }}>
      {/* overlay para contraste */}
      <View
        style={[
          styles.overlay,
          { backgroundColor: mode === "dark" ? "rgba(8,12,20,0.78)" : "rgba(255,255,255,0.70)" },
        ]}
      />

      <ScrollView style={page} contentContainerStyle={content}>
        {/* Header */}
        <View style={topRow}>
          <View style={{ flex: 1, minWidth: 260 }}>
            <Text style={{ color: theme.colors.mutedText }}>Olá, equipe</Text>
            <Text style={{ color: theme.colors.text, fontSize: 28, marginTop: 4, ...theme.fonts.heavy }}>
              Painel da clínica
            </Text>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <StatPill theme={theme} label="🟢 Plantão ativo" />
              <StatPill theme={theme} label="6 profissionais online" />
              <StatPill theme={theme} label="Tempo médio de resposta: 3 min" />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Pressable
              onPress={() => navigation.navigate("BIClinic")}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              }}
            >
              <Text style={{ color: theme.colors.text, ...theme.fonts.medium }}>Ver BI da clínica →</Text>
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

        {/* Conteúdo principal */}
        <View style={twoCol}>
          <View style={{ flex: 1, gap: theme.spacing(2) }}>
            <Panel theme={theme} title="Crises em andamento" subtitle="Central de resposta rápida com prioridades.">
              <Item theme={theme} tone="danger" title="Casos críticos" desc="2 pacientes • resposta média 3 min" />
              <Item theme={theme} tone="warning" title="Alto risco em observação" desc="3 pacientes • monitoramento ativo" />

              <Pressable
                onPress={() => navigation.navigate("CrisisForm")}
                style={{
                  marginTop: theme.spacing(1),
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderRadius: 14,
                  backgroundColor: theme.colors.primary,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "#fff", ...theme.fonts.bold }}>Registrar nova crise →</Text>
              </Pressable>
            </Panel>

            <Panel theme={theme} title="Ações rápidas" subtitle="Atalhos do time para ganhar tempo.">
              <Pressable
                onPress={() => navigation.navigate("CrisisForm")}
                style={{
                  padding: theme.spacing(2),
                  borderRadius: theme.radius.lg,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  backgroundColor: mode === "dark" ? "rgba(79,195,247,0.10)" : "rgba(0,122,255,0.10)",
                }}
              >
                <Text style={{ color: theme.colors.text, ...theme.fonts.bold }}>⚡ Nova crise</Text>
                <Text style={{ color: theme.colors.mutedText, marginTop: 4 }}>Abrir protocolo em segundos</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Chat")}
                style={{
                  padding: theme.spacing(2),
                  borderRadius: theme.radius.lg,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  backgroundColor: "rgba(34,197,94,0.10)",
                }}
              >
                <Text style={{ color: theme.colors.text, ...theme.fonts.bold }}>💬 Bater papo</Text>
                <Text style={{ color: theme.colors.mutedText, marginTop: 4 }}>Falar com paciente ou família</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Videos")}
                style={{
                  padding: theme.spacing(2),
                  borderRadius: theme.radius.lg,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  backgroundColor: "rgba(250,173,20,0.10)",
                }}
              >
                <Text style={{ color: theme.colors.text, ...theme.fonts.bold }}>📚 Biblioteca de vídeos</Text>
                <Text style={{ color: theme.colors.mutedText, marginTop: 4 }}>Treinamento para equipe e famílias</Text>
              </Pressable>
            </Panel>
          </View>

          <View style={{ flex: 1, gap: theme.spacing(2) }}>
            <Panel theme={theme} title="Agenda de hoje" subtitle="Visão rápida das sessões e prioridades.">
              <Item theme={theme} title="42 atendimentos previstos" desc="5 avaliações • 37 rotinas" />
              <Item theme={theme} title="3 reavaliações de risco" desc="Pacientes em alto risco com revisão agendada" />
            </Panel>

            <Panel theme={theme} title="BI da clínica (resumo)" subtitle="Indicadores do mês para decisão rápida.">
              <Item theme={theme} title="Taxa de presença" desc="93% (+2% vs mês passado)" />
              <Item theme={theme} title="Tempo médio de resposta" desc="3m 12s (melhorando)" />
              <Item theme={theme} title="Evolução média (global)" desc="↑ 11% em autonomia e comunicação" />

              <Pressable onPress={() => navigation.navigate("BIClinic")}>
                <Text style={{ color: theme.colors.primary, ...theme.fonts.medium, marginTop: 8 }}>
                  Abrir BI completo →
                </Text>
              </Pressable>
            </Panel>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
