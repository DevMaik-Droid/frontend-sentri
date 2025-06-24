import { useState, useEffect, type ReactNode } from "react";
import AuthContext, { type AuthContextType } from "./AuthContext";
import type { UsuarioCompleto } from "../types/usuarios-types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      setUsuario(JSON.parse(stored));
    }
  }, []);

  const login = (user: UsuarioCompleto) => {
    setUsuario(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("auth_user");
  };

  const value: AuthContextType = {
    usuario,
    login,
    logout,
    isAuthenticated: !!usuario,
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};
