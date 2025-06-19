export interface Usuario{
    id?: number | null
    nombre: string
    apellido?: string | null
    fecha_nacimiento?: Date | string | null
    cedula?: string | null
    genero?: string | null
    direccion?: string | null
    telefono?: string | null
    email?: string | null
    password_hash?: string | null
    foto_perfil?: string | null
    estado?: string | null
    rol: "ADMIN" | "DOCENTE" | "ESTUDIANTE"
    rol_id?: number | null
}
