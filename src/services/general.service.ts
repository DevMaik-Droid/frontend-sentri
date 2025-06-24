import type { Horarios, Paralelos } from "../types/general/general-types";
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
    getParalelos: async () => {
        const response = await api.get("general/paralelos");
        return response.data;
    },
    getAulas: async () => {
        const response = await api.get("general/aulas");
        return response.data;
    },
    crearParalelos : async (paralelos : Paralelos[]) => {
        const response = await api.post("general/paralelo/registrar", paralelos);
        return response.data;
    },
    crearHorario : async (horario : Horarios[]) => {
        const response = await api.post("general/horario/registrar", horario);
        return response.data;
    },

    login : async (username : string, password : string) => {
        const response = await api.post("usuario/login", {username, password});
        return response.data;
    } 
};