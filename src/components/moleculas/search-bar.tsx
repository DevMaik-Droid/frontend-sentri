"use client"

import { Search } from "lucide-react"
import { Input } from "../ui/input"

interface SearchBarProps {
  placeholder?: string
  className?: string
  onSearch?: (value: string) => void
}

export function SearchBar({ placeholder = "Buscar...", className, onSearch }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder={placeholder} className="pl-8" onChange={(e) => onSearch?.(e.target.value)} />
    </div>
  )
}
