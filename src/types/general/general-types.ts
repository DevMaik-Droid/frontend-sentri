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
export interface GetParalelo {
  id: number;
  paralelo: string;
  materia : string
  nivel_id : number
}

export interface Horario {
  id?: number;
  dias_semana: string[];
  hora_inicio: string;
  hora_fin: string;
  paralelo_id: number;
  aula_id: number;
}

export interface Aula{
  id? : number;
  nombre : string;
  descripcion : string;
  capacidad : number;
  ubicacion : string;
}