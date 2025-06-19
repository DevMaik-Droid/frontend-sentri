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

export interface Paralelo {
  nombre: string;
  docente_id: number | null;
  gestion_id: number;
  materia_id: number;
  cupos: number;
}