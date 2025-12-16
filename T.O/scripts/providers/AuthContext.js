// scripts/providers/AuthContext.js
import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // { role: "parent"|"clinic", name, ... }

  // MOCK temporário (depois liga no backend)
  async function login({ email, password, accessType }) {
    // validação básica
    if (!email || !password) throw new Error("Preencha e-mail e senha");

    // aqui você vai trocar pelo fetch no /auth/login quando quiser
    setToken("mock-token");
    setUser({
      name: accessType === "clinic" ? "Equipe" : "Família",
      role: accessType, // "parent" | "clinic"
    });
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, isAuthed: !!token, login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
