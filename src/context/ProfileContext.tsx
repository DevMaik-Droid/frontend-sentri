import { createContext } from "react";
import type { Estudiantes } from "../types/estudiante/estudiante-types";

export interface ProfileContextType {
  estudiante: Estudiantes | null;
  guardarEstudiante: (estudiante: Estudiantes) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export default ProfileContext;