import { useState, useEffect, type ReactNode } from "react";
import type { Estudiantes } from "../types/estudiante/estudiante-types";
import type { ProfileContextType } from "./ProfileContext";
import ProfileContext from "./ProfileContext";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [estudiante, setEstudiante] = useState<Estudiantes | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      setEstudiante(JSON.parse(stored));
    }
  }, []);

  const guardarEstudiante = (est: Estudiantes) => {
    setEstudiante(est);
    localStorage.setItem("profile", JSON.stringify(est));
  };

  const value: ProfileContextType = {
    estudiante,
    guardarEstudiante
  };

  return <ProfileContext.Provider value={value}>
    {children}
    </ProfileContext.Provider>;
};
