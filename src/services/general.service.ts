import { api } from "./api";


export const GeneralService = {
    getNiveles: async () => {
        const response = await api.get("general/niveles");
        return response.data;
    },
    getMaterias: async () => {
        const response = await api.get("general/materias");
        return response.data;
    }
};