import type { Docente } from "./docente/docente-types"
import type { Estudiantes } from "./estudiante/estudiante-types"

export interface Usuarios{
    id: number | null
    nombre: string
    apellido: string
    fecha_nacimiento: string | null
    cedula: string | null
    genero: string | null
    direccion?: string | null
    telefono?: string | null
    email?: string | null
    password_hash?: string | null
    foto_perfil: string | null
    estado?: string | null
    rol_id?: number | null
    fecha_creacion?: string | null
}
export interface Rol{
    id : number
    nombre : "ADMIN" | "DOCENTE" | "ESTUDIANTE"
    descripcion : string    
}
export interface Rostro{
    id?: number
    usuario_id?: number
    foto?: string
}
export interface UsuarioCompleto{
    usuario : Usuarios
    rol? : Rol
    rostro? : Rostro
}

export interface UsuarioData{
    usuario : UsuarioCompleto
    estudiante? : Estudiantes
    docente? : Docente
}
