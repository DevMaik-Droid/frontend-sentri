
import { GraduationCap } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import FormularioLogin from "../organismos/FormularioLogin";
import { Button } from "../ui/button";
export default function LayoutLogin() {

    
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header con logo educativo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Edu Sentri</h1>
          <p className="text-gray-600">Plataforma Educativa</p>
        </div>

        <Card className="shadow border-0 flex flex-col gap-4 bg-neutral-200" >
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center">
              Accede a tu cuenta para continuar con tus estudios
            </CardDescription>
            
            <FormularioLogin/>

          </CardHeader>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2025 Edu Sentri. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button variant="link" className="px-0 text-xs">
              Términos de Servicio
            </Button>
            <Button variant="link" className="px-0 text-xs">
              Política de Privacidad
            </Button>
            <Button variant="link" className="px-0 text-xs">
              Soporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
