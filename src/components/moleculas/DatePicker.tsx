"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import type { UseFormSetValue } from "react-hook-form"
import type { Estudiante } from "../../types/estudiante/estudiante-types"
import { format } from "date-fns"


interface Props {
  setValue: UseFormSetValue<Estudiante>;
}

export function DatePicker({  setValue }: Props) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Seleccionar fecha"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
              setValue("usuario.fecha_nacimiento", format(String(date), "yyyy-MM-dd"))
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}