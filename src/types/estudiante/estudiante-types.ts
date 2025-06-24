import type { Niveles, ParaleloCompleto } from "../general/general-types";
import type { Usuarios } from "../usuarios-types";

export interface Estudiantes{
    id ?: number
    codigo? : string
    nivel_id? : number
    usuario_id ?: number
}

export interface Inscripciones{
    id ?: number
    estudiante_id : number
    paralelo_id : number
    fecha_inscripcion : string
    estado : string
}
export interface InscripcionCompleta{
    paralelo : ParaleloCompleto
}

export interface EstudianteCompleto{
    usuario : Usuarios
    estudiante : Estudiantes
    niveles? : Niveles
    inscripciones? : InscripcionCompleta
}