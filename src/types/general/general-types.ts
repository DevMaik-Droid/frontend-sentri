import type { Docente } from "../docente/docente-types";

export interface Roles {
  id: number;
  rol: string;
  descripcion: string;
  
}
export interface GestionesAcademicas {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: string;
  descripcion: string;
}

export interface Materias {
    id: number;
    nombre: string;
    descripcion: string;
    nivel_id: number;
}

export interface Niveles {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Paralelos {
  id?: number;
  nombre: string;
  docente_id: number | null;
  gestion_id: number;
  materia_id: number;
  cupos: number;
  activo? : string
  fecha_creacion? : string
}

export interface Horarios{
  id?: number;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  paralelo_id: number;
  aula_id: number;
}

export interface Aulas{
  id? : number;
  nombre : string;
  descripcion : string;
  capacidad : number;
  ubicacion : string;
}

export interface HorarioCompleto {
  horario : Horarios;
  paralelo : Paralelos;
  aula : Aulas;
}

export interface ParaleloCompleto {
  docente? : Docente;
  materia : Materias;
  paralelo : Paralelos;
  aula : Aulas;
  horario : Horarios;

}