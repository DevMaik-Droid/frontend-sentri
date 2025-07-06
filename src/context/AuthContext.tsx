import { createContext } from "react";
import type {  UsuarioData } from "../types/usuarios-types";

export interface AuthContextType {
  usuario: UsuarioData | null;
  login: (usuario : UsuarioData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
