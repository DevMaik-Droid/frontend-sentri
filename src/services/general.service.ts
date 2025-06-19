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

    login : async (username : string, password : string) => {
        const response = await api.post("usuario/login", {username, password});
        return response.data;
    } 
};