// scripts/screens/Login.js
import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { useTheme } from "../providers/ThemeContext";
import { useAuth } from "../providers/AuthContext";

export default function Login({ navigation }) {
  const { colors, tokens } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accessType, setAccessType] = useState("parent"); // "parent" | "clinic"
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const title = useMemo(() => {
    return accessType === "clinic"
      ? "Entrar como clínica"
      : "Entrar como família";
  }, [accessType]);

  async function onSubmit() {
    setErr("");
    setLoading(true);
    try {
      await login({ email, password, accessType });
      navigation.reset({
        index: 0,
        routes: [{ name: accessType === "clinic" ? "ClinicHome" : "ParentHome" }],
      });
    } catch (e) {
      setErr(e?.message || "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.page, { backgroundColor: colors.bg }]}>
      <View style={[styles.hero, { backgroundColor: colors.bg2 }]}>
        <View style={{ maxWidth: 520, width: "100%" }}>
          <Text style={[styles.brand, { color: colors.text }]}>Para</Text>
          <Text style={[styles.h1, { color: colors.text }]}>
            Menos planilha, <Text style={{ color: colors.primary }}>mais tempo terapêutico</Text>.
          </Text>
          <Text style={[styles.p, { color: colors.text2 }]}>
            Conecte famílias e clínica em um fluxo único de atividades, registros e evolução.
          </Text>

          <View style={[styles.badges]}>
            <Badge text="TEA" />
            <Badge text="Terapia Ocupacional" />
            <Badge text="BI de evolução" />
            <Badge text="Assistente IA" />
          </View>
        </View>
      </View>

      <View style={[styles.cardWrap]}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: tokens.radius.xl }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Entrar na Para</Text>
          <Text style={[styles.cardSub, { color: colors.text2 }]}>
            Acesse com seu e-mail e escolha o tipo de acesso.
          </Text>

          <Text style={[styles.label, { color: colors.text2 }]}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="voce@exemplo.com"
            placeholderTextColor={colors.text2}
            autoCapitalize="none"
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.bg2, borderRadius: tokens.radius.md }]}
          />

          <Text style={[styles.label, { color: colors.text2, marginTop: 12 }]}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.text2}
            secureTextEntry
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.bg2, borderRadius: tokens.radius.md }]}
          />

          <View style={[styles.segment, { borderColor: colors.border, borderRadius: tokens.radius.lg }]}>
            <SegButton
              active={accessType === "parent"}
              label="Família"
              onPress={() => setAccessType("parent")}
            />
            <SegButton
              active={accessType === "clinic"}
              label="Clínica"
              onPress={() => setAccessType("clinic")}
            />
          </View>

          {!!err && <Text style={[styles.err, { color: colors.danger }]}>{err}</Text>}

          <Pressable
            onPress={onSubmit}
            style={[
              styles.cta,
              {
                backgroundColor: colors.primary,
                borderRadius: tokens.radius.lg,
                opacity: loading ? 0.7 : 1,
              },
            ]}
            disabled={loading}
          >
            <Text style={styles.ctaText}>{loading ? "Entrando..." : title}</Text>
          </Pressable>

          <Text style={[styles.footer, { color: colors.text2 }]}>
            © 2025 Para • Plataforma para famílias e clínicas
          </Text>
        </View>
      </View>
    </View>
  );
}

function Badge({ text }) {
  const { colors, tokens } = useTheme();
  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.chip, borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border }}>
      <Text style={{ color: colors.text, fontWeight: "800" }}>{text}</Text>
    </View>
  );
}

function SegButton({ active, label, onPress }) {
  const { colors, tokens } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: tokens.radius.lg,
        backgroundColor: active ? colors.primary : "transparent",
      }}
    >
      <Text style={{ color: active ? "#fff" : colors.text, fontWeight: "800" }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, flexDirection: "row" },
  hero: {
    flex: 1.1,
    padding: 36,
    justifyContent: "center",
    borderRightWidth: Platform.OS === "web" ? 1 : 0,
  },
  brand: { fontSize: 18, fontWeight: "900", marginBottom: 10 },
  h1: { fontSize: 40, lineHeight: 44, fontWeight: "900" },
  p: { marginTop: 14, fontSize: 16, lineHeight: 22, maxWidth: 520 },
  badges: { marginTop: 20, flexDirection: "row", flexWrap: "wrap", gap: 10 },

  cardWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  card: { width: "100%", maxWidth: 520, padding: 22, borderWidth: 1 },
  cardTitle: { fontSize: 22, fontWeight: "900" },
  cardSub: { marginTop: 6, marginBottom: 18, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: "800" },
  input: { borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, marginTop: 8, fontWeight: "600" },
  segment: { marginTop: 16, flexDirection: "row", padding: 6, borderWidth: 1, gap: 6 },
  err: { marginTop: 10, fontWeight: "700" },
  cta: { marginTop: 16, paddingVertical: 14, alignItems: "center" },
  ctaText: { color: "#fff", fontWeight: "900", fontSize: 16 },
  footer: { marginTop: 16, textAlign: "center" },
});
