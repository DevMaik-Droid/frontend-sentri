import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DialogProps {
  children: React.ReactNode;
  titulo: string;
  descripcion: string;
  entidad : object;
}

export default function DialogCustom({ children, titulo, descripcion, entidad }: DialogProps) {

    const [activo, setActivo] = useState(null);
  return (
    <>
      {/* Modal de vista detallada -------------------------------------------------- */}
      <Dialog
        open={!!activo}
        onOpenChange={() => setActivo(null)}
      >
        <DialogContent className="w-7xl">
          <DialogHeader>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogDescription>
              {descripcion}
            </DialogDescription>
          </DialogHeader>

          {activo && (
            children
          )}
          <DialogFooter>
            <Button onClick={() => setActivo(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal de vista detallada -------------------------------------------------- */}
    </>
  );
}
