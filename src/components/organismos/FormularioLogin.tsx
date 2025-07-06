"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../../components/ui/button";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { Eye, EyeOff } from "lucide-react";
import { GeneralService } from "../../services/general.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

export default function FormularioLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Validación básica
    if (!username || !password) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await GeneralService.login(username, password);
      if (response.result === "ok") {
        
        login(response.data);
        setIsLoading(false);

        switch (response.data.usuario.rol.nombre) {
          case "ADMIN":
            navigate("/dashboard");
            break;
          case "DOCENTE":
            navigate("/dashboard/docente");
            break;
          case "ESTUDIANTE":
            navigate("/dashboard/estudiante");
            break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Credenciales incorrectas");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Toaster></Toaster>
      <div className="space-y-2">
        <Label htmlFor="username">Correo Electrónico o Cedula</Label>
        <Input
          id="username"
          type="username"
          placeholder="estudiante@ejemplo.com o cedula "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-11 bg-white"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 pr-10 bg-white"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="link" className="px-0 font-normal text-sm">
          ¿Olvidaste tu contraseña?
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Iniciando sesión...</span>
          </div>
        ) : (
          "Iniciar Sesión"
        )}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">¿No tienes cuenta? </span>
        <Button variant="link" className="px-0 font-normal">
          Regístrate aquí
        </Button>
      </div>
    </form>
  );
}
