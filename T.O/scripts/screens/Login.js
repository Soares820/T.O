import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../providers/ThemeContext";

// ✅ caminho correto (SEM extensão dá erro no web)
import bgImage from "../../assets/images/autismo_capa-1920x1080.jpg";

export default function Login() {
  const navigation = useNavigation();
  const { theme, mode, toggle } = useTheme();
  const { width, height } = useWindowDimensions();

  const isMobile = width < 900;
  const isSmallPhone = width < 380;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("family"); // family | clinic

  function handleLogin() {
    navigation.reset({
      index: 0,
      routes: [{ name: role === "family" ? "ParentHome" : "ClinicHome" }],
    });
  }

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.page}>
      {/* Overlay pra leitura do texto */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: isMobile
              ? "rgba(5, 10, 20, 0.90)"
              : "rgba(5, 10, 20, 0.72)",
          },
        ]}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.page}
      >
        <View
          style={[
            styles.container,
            {
              padding: isSmallPhone ? 16 : isMobile ? 20 : 28,
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? 20 : 56,
              minHeight: height,
            },
          ]}
        >
          {/* HERO – some no mobile */}
          {!isMobile && (
            <View style={styles.hero}>
              <View style={styles.brandRow}>
                <View
                  style={[
                    styles.brandIcon,
                    {
                      backgroundColor:
                        mode === "dark"
                          ? "rgba(79,195,247,0.18)"
                          : "rgba(0,122,255,0.18)",
                      borderColor: "rgba(255,255,255,0.15)",
                    },
                  ]}
                >
                  <Text style={{ color: theme.colors.primary, fontWeight: "900" }}>
                    T
                  </Text>
                </View>

                <Text style={[styles.brand, { color: "#EAF0FF" }]}>
                  Plataforma TEA & TO
                </Text>
              </View>

              <Text style={[styles.title, { color: "#EAF0FF" }]}>
                Menos planilha,{" "}
                <Text style={{ color: theme.colors.primary }}>
                  mais tempo terapêutico
                </Text>
                .
              </Text>

              <Text style={[styles.subtitle, { color: "rgba(234,240,255,0.78)" }]}>
                Conecte famílias e clínicas em um fluxo único de atividades,
                registros, crises e evolução — com BI e suporte inteligente.
              </Text>
            </View>
          )}

          {/* CARD LOGIN – centralizado e mobile first */}
          <View
            style={[
              styles.card,
              {
                width: isMobile ? "100%" : 440,
                maxWidth: 520,
                backgroundColor: "rgba(14, 22, 40, 0.72)",
                borderColor: "rgba(255,255,255,0.10)",
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: "#EAF0FF" }]}>Entrar</Text>

              <Pressable
                onPress={toggle}
                style={[
                  styles.themeBtn,
                  {
                    borderColor: "rgba(255,255,255,0.14)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                ]}
              >
                <Text style={{ color: "#EAF0FF" }}>
                  {mode === "dark" ? "🌙" : "☀️"}
                </Text>
              </Pressable>
            </View>

            <Text style={[styles.cardDesc, { color: "rgba(234,240,255,0.75)" }]}>
              Acesse com seu e-mail e escolha o tipo de acesso.
            </Text>

            <Text style={[styles.label, { color: "rgba(234,240,255,0.75)" }]}>
              E-mail
            </Text>
            <TextInput
              placeholder="voce@exemplo.com"
              placeholderTextColor="rgba(234,240,255,0.45)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={[
                styles.input,
                {
                  color: "#EAF0FF",
                  borderColor: "rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                },
              ]}
            />

            <Text
              style={[
                styles.label,
                { color: "rgba(234,240,255,0.75)", marginTop: 12 },
              ]}
            >
              Senha
            </Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="rgba(234,240,255,0.45)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[
                styles.input,
                {
                  color: "#EAF0FF",
                  borderColor: "rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                },
              ]}
            />

            {/* ROLE */}
            <View
              style={[
                styles.roleRow,
                { flexDirection: isSmallPhone ? "column" : "row" },
              ]}
            >
              <Pressable
                onPress={() => setRole("family")}
                style={[
                  styles.roleBtn,
                  {
                    borderColor:
                      role === "family"
                        ? theme.colors.primary
                        : "rgba(255,255,255,0.14)",
                    backgroundColor:
                      role === "family"
                        ? "rgba(79,195,247,0.14)"
                        : "rgba(255,255,255,0.03)",
                  },
                ]}
              >
                <Text style={{ color: "#EAF0FF", fontWeight: "700" }}>
                  👨‍👩‍👧 Família
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRole("clinic")}
                style={[
                  styles.roleBtn,
                  {
                    borderColor:
                      role === "clinic"
                        ? theme.colors.primary
                        : "rgba(255,255,255,0.14)",
                    backgroundColor:
                      role === "clinic"
                        ? "rgba(79,195,247,0.14)"
                        : "rgba(255,255,255,0.03)",
                  },
                ]}
              >
                <Text style={{ color: "#EAF0FF", fontWeight: "700" }}>
                  🏥 Clínica
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={handleLogin}
              style={[styles.submit, { backgroundColor: theme.colors.primary }]}
            >
              <Text style={styles.submitText}>
                Entrar como {role === "family" ? "família" : "clínica"}
              </Text>
            </Pressable>

            <Text style={styles.footer}>
              © 2025 T.O — plataforma para famílias e clínicas
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },

  overlay: { ...StyleSheet.absoluteFillObject },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },

  hero: {
    flex: 1,
    maxWidth: 560,
    gap: 16,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },

  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  brand: {
    fontSize: 14,
    opacity: 0.92,
    fontWeight: "700",
  },

  title: {
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 46,
    letterSpacing: 0.2,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 520,
  },

  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 22,
    alignSelf: "center",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
  },

  themeBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cardDesc: {
    marginTop: 8,
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  roleRow: {
    gap: 12,
    marginTop: 16,
  },

  roleBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },

  submit: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },

  footer: {
    color: "rgba(234,240,255,0.55)",
    textAlign: "center",
    marginTop: 18,
    fontSize: 12,
  },
});
