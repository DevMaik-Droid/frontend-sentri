import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"


interface Props{
    rolesPermitidos: "ADMIN" | "DOCENTE" | "ESTUDIANTE"
}
export default function PrivateRoutes({rolesPermitidos}:Props) {

    const {usuario, isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>
    }
    if (!usuario) {
        return <Navigate to="/" replace/>
    }

    if (!rolesPermitidos.includes(usuario.usuario.rol)) {
        return <Navigate to="/" replace/>
    }

  return (
    <Outlet/>
  )
}

