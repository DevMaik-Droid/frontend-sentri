import { createContext } from "react";
import type { UsuarioCompleto } from "../types/usuarios-types";

export interface AuthContextType {
  usuario: UsuarioCompleto | null;
  login: (usuario : UsuarioCompleto) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
