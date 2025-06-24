import { createContext } from "react";
import type { Usuarios } from "../types/usuarios-types";

export interface AuthContextType {
  usuario: Usuarios | null;
  login: (usuario : Usuarios) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
