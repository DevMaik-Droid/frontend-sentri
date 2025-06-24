interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Paralelo {
  id: number;
  nombre: string;
  cupos: number;
  activo: string;
  aula: {
    nombre: string;
  };
  horarios: Array<{
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
  }>;
}

export interface MateriaAgrupada {
  materia: Materia;
  paralelos: Paralelo[];
}