import type { Usuario } from "../usuarios-types";

export interface Estudiante{

    usuario : Usuario
    codigo : string
    nivel_id : number
    usuario_id ?: number

}