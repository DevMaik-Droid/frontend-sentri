import type { Usuario } from "../usuarios-types";

export interface Estudiante{

    usuario : Usuario
    estudiante : {
        codigo : string
        nivel_id : number
        usuario_id ?: number
    }
    
}