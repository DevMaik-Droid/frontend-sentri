import { createContext } from "react";
import type { Usuario } from "../types/usuarios-types";

export interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario : Usuario) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
