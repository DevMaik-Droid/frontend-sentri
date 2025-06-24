import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { AvatarImage } from "../../atomos/avatar-image";
import { CustomBadge } from "../../atomos/custom-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import type { EstudianteCompleto } from "../../../types/estudiante/estudiante-types";

import { useState } from "react";
import { InfoDialog } from "./InfoDialog";

interface TableProps {
  estudiantes: EstudianteCompleto[];
  nivelSeleccionado: string;
  filtro: string;
}

export default function TablaEstudiantes({
  estudiantes,
  nivelSeleccionado,
  filtro,
}: TableProps) {

  const [verEstudiante, setVerEstudiante] = useState<EstudianteCompleto>();
  const [dialogOpen, setDialogOpen] = useState(false);


  const handleVerEstudiante = (estudiante: EstudianteCompleto) => {
    if (estudiante == null) return;
    setVerEstudiante(estudiante);
    setDialogOpen(true);
  };

  // Filtrar estudiantes basado en búsqueda y filtros
  const filtro_estudiantes = estudiantes.filter((estudiante) => {
    // const matchesSearch =
    //   student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   student.id.toLowerCase().includes(searchTerm.toLowerCase());

    const porNivel =
      nivelSeleccionado === "TODOS" ||
      estudiante.niveles?.nombre === nivelSeleccionado;

    const porEstado =
      filtro === "TODOS" || estudiante.usuario.estado === filtro;

    return porNivel && porEstado;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Estudiante</TableHead>
            <TableHead>Cedula</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Semestre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Promedio</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtro_estudiantes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-muted-foreground"
              >
                No se encontraron estudiantes con los criterios de búsqueda.
              </TableCell>
            </TableRow>
          ) : (
            filtro_estudiantes?.map((data) => (
              <TableRow key={data.estudiante.id}>
                <TableCell className="font-medium">
                  {data.estudiante.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <AvatarImage
                      src={data.usuario.foto_perfil || "/placeholder.svg"}
                      alt={data.usuario.nombre}
                      size="md"
                    />
                    <div>
                      <div className="font-medium">{data.usuario.nombre}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.usuario.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{data.usuario.cedula || "Sin cedula"}</TableCell>
                <TableCell>{data.usuario.telefono || "Sin telefono"}</TableCell>
                <TableCell>{data.niveles?.nombre}</TableCell>
                <TableCell>
                  <CustomBadge
                    variant={
                      data.usuario.estado === "ACTIVO" ? "default" : "secondary"
                    }
                  >
                    {data.usuario.estado}
                  </CustomBadge>
                </TableCell>
                <TableCell>
                  <CustomBadge variant="outline">A</CustomBadge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                      <DropdownMenuItem onClick={() => handleVerEstudiante(data)}>

                        <Eye className="mr-2 h-4 w-4" />
                        
                        Ver Perfil
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  

                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/*dialogs para ver el estudiante*/}

      
      {/* Paginación */}
      <div className="flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Mostrando <strong>{filtro_estudiantes.length}</strong> de{" "}
          <strong>{estudiantes.length}</strong> estudiantes
        </div>
      </div>

      <InfoDialog estudiante={verEstudiante} open={dialogOpen} onOpenChange={setDialogOpen}/>

      
    </>
  );
}
