import type { Estudiante } from "../../types/estudiante/estudiante-types";
import { api } from "../api";



export const EstudianteService = {


    registrarEstudiante : async (estudiante : Estudiante) => {
        const response = await api.post("estudiante/registrar", estudiante);
        return response.data;
    }


}