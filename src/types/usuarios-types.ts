export interface Usuarios{
    id?: number
    nombre: string
    apellido?: string
    fecha_nacimiento?: string
    cedula?: string
    genero?: string
    direccion?: string
    telefono?: string
    email?: string
    password_hash?: string
    foto_perfil?: string
    estado?: string
    rol: "ADMIN" | "DOCENTE" | "ESTUDIANTE"
    rol_id?: number
}
