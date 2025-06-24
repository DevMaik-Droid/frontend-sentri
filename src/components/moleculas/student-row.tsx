"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { TableCell, TableRow } from "../ui/table"
import { AvatarImageCustom } from "../atomos/avatar-image"
import { CustomBadge } from "../atomos/custom-badge"

interface Student {
  id: string
  name: string
  email: string
  course: string
  status: "Activo" | "Inactivo"
  grade: string
  avatar?: string
}

interface StudentRowProps {
  student: Student
  onEdit?: (student: Student) => void
  onDelete?: (student: Student) => void
  onViewProfile?: (student: Student) => void
}

export function StudentRow({ student, onEdit, onDelete, onViewProfile }: StudentRowProps) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <AvatarImageCustom src={student.avatar || "/placeholder.svg?height=32&width=32"} alt={student.name} size="md" />
          <div>
            <div className="font-medium">{student.name}</div>
            <div className="text-sm text-muted-foreground">{student.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{student.course}</TableCell>
      <TableCell>
        <CustomBadge variant={student.status === "Activo" ? "default" : "secondary"}>{student.status}</CustomBadge>
      </TableCell>
      <TableCell>
        <CustomBadge variant="outline">{student.grade}</CustomBadge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewProfile?.(student)}>Ver Perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(student)}>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(student)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
