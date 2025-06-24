import type { Estudiantes } from "../../types/estudiante/estudiante-types";
import { api } from "../api";



export const EstudianteService = {


    registrarEstudiante : async (estudiante : Estudiantes) => {
        const response = await api.post("estudiante/registrar", estudiante);
        return response.data;
    },
    obtenerEstudianteByUsuario : async (id : number) => {
        const response = await api.get(`estudiante/obtener/usuario/${id}`);
        return response.data;
    },
    obtenerTodosEstudiante : async () => {
        const response = await api.get("estudiante/obtener/todos");
        return response.data;
    },

    obtenerMateriasEstudiante : async (id : number) => {
        const response = await api.get(`estudiante/paralelos/${id}`);
        return response.data;
    }

}