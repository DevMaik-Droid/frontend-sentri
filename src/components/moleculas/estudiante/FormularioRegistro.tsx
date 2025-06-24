
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { DatePicker } from "../DatePicker";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import type { EstudianteCompleto } from "../../../types/estudiante/estudiante-types";
import type { Niveles } from "../../../types/general/general-types";

interface Props {
  register: UseFormRegister<EstudianteCompleto>;
  setValue: UseFormSetValue<EstudianteCompleto>;
  niveles: Niveles[];
}

export function FormularioRegistro({register, setValue, niveles}: Props) {
  return (
    <div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex gap-4">
          <div className="space-y-2 w-1/2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              {...register("usuario.nombre", { required: true })}
              placeholder="Nombre"
              id="nombre"
            />
          </div>
          <div className="space-y-2 w-1/2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              {...register("usuario.apellido", { required: true })}
              id="apellido"
              placeholder="Apellido"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="direccion">Direccion</Label>
          <Input
            {...register("usuario.direccion", { required: true })}
            id="direccion"
            placeholder="Z, calle, avenida"
          />
        </div>

        <div className="flex gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha de Nacimiento</Label>
            <DatePicker setValue={setValue} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cedula">Cedula</Label>
            <Input
              {...register("usuario.cedula", { required: true })}
              id="cedula"
              placeholder="Cedula"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Telefono</Label>
            <Input
              {...register("usuario.telefono", { required: true })}
              id="telefono"
              placeholder="Telefono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="genero">Genero: </Label>
          <RadioGroup
            defaultValue="comfortable"
            onValueChange={(value) => setValue("usuario.genero", value)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="M" id="r1" />
              <Label htmlFor="r1">Masculino</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="F" id="r2" />
              <Label htmlFor="r2">Femenino</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            {...register("usuario.email", { required: true })}
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="codigo">Codigo</Label>
            <Input  {...register("estudiante.codigo", { required: true })} id="codigo" type="text" placeholder="XXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semestre</Label>
            <Select onValueChange={(value) => setValue("estudiante.nivel_id", Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar semestre"  />
              </SelectTrigger>
              <SelectContent>
                {niveles?.map((nivel) => (
                  <SelectItem key={nivel.id} value={String(nivel.id)}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
