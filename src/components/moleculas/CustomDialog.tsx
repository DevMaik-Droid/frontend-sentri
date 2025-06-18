import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface CustomDialogProps {
  triggerLabel: string;
  triggerIcon?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  confirmLabel?: string;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>, closeDialog: () => void) => void;
}

export function CustomDialog({
  triggerLabel,
  triggerIcon,
  title,
  description,
  children,
  confirmLabel = "Guardar",
  onConfirm,
}: CustomDialogProps) {


  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {triggerIcon && <span className="mr-2">{triggerIcon}</span>}
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            Cancelar
          </Button>
          <Button onClick={(e) => onConfirm(e, closeDialog)}>{confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
