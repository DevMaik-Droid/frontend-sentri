
import LayoutLogin from '../components/templates/LayoutLogin'
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const {isAuthenticated,usuario} = useAuth();

  if (isAuthenticated) {
    
    switch (usuario?.usuario.rol?.nombre) {
      case "ESTUDIANTE":
        return <Navigate to="/dashboard/estudiante" replace/>
      case "DOCENTE":
        return <Navigate to="/dashboard/docente" replace/>
      case "ADMIN":
        return <Navigate to="/dashboard" replace/>
    }
  }
  return (
    <LayoutLogin></LayoutLogin>
  )
}
