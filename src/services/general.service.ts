import type { Paralelo } from "../types/general/materia-types";
import { api } from "./api";


export const GeneralService = {
    getNiveles: async () => {
        const response = await api.get("general/niveles");
        return response.data;
    },
    getMaterias: async () => {
        const response = await api.get("general/materias");
        return response.data;
    },
    crearParalelos : async (paralelos : Paralelo[]) => {
        const response = await api.post("general/paralelo/registrar", paralelos);
        return response.data;
    },
    login : async (username : string, password : string) => {
        const response = await api.post("usuario/login", {username, password});
        return response.data;
    } 
};