import {
  User,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Upload,
  X,
  Check,
  Settings,
  UserCircle,
  Shield,
  Globe,
  Palette,
  Bell,
  Scan,
  Badge,
} from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuth } from "../../hooks/useAuth"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import { AvatarImageCustom } from "../atomos/avatar-image"


interface UserMenuProps {
  userName?: string
  userAvatar?: string
  variant?: "sidebar" | "header"
}

export function UserMenu({ userName = "Admin User", userAvatar, variant = "header" }: UserMenuProps) {

  const { usuario, logout } = useAuth()
  userName = `${usuario?.usuario?.nombre} ${usuario?.usuario?.apellido}`

  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const [isCapturingFace, setIsCapturingFace] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)



  const userInitials = `${usuario?.usuario.nombre[0]}${usuario?.usuario.apellido[0] || ""}`
 
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando perfil...")
    setProfileOpen(false)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Cambiando contraseña...")
  }

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando configuraciones...")
    setSettingsOpen(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "profile" | "face") => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "profile") {
          setProfileImage(result)
        } else {
          setFaceImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const startFaceCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturingFace(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const captureFace = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/png")
        setFaceImage(imageData)
        stopFaceCapture()
      }
    }
  }

  const stopFaceCapture = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsCapturingFace(false)
  }

  const removeImage = (type: "profile" | "face") => {
    if (type === "profile") {
      setProfileImage(null)
    } else {
      setFaceImage(null)
    }
  }


  if (variant === "sidebar") {
    return (
      <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage || ""} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="truncate font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground">{usuario?.usuario.email}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{usuario?.usuario.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setProfileOpen(true)} className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-600 focus:text-red-600">
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de Perfil */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[50%] min-h-[600px] overflow-y-auto">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profileImage || ""} alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{userName}</DialogTitle>
                <DialogDescription className="text-base">
                  Gestiona tu información personal y académica
                </DialogDescription>
                <Badge className="mt-1">
                  {usuario?.usuario.rol}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="flex justify-around w-full">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Fotos
              </TabsTrigger>
              {usuario?.usuario.rol === "ESTUDIANTE" && (
                <TabsTrigger value="academic" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Académico
                </TabsTrigger>
              )}
              
            </TabsList>

            <TabsContent value="personal" className="space-y-6 mt-6">
              <form onSubmit={handleProfileSave} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre *</Label>
                        <Input
                          id="nombre"
                          defaultValue={usuario?.usuario.nombre || ""}
                          placeholder="Ingresa tu nombre"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido *</Label>
                        <Input
                          id="apellido"
                          defaultValue={usuario?.usuario.apellido || ""}
                          placeholder="Ingresa tu apellido"
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={usuario?.usuario.email || ""}
                        placeholder="tu@email.com"
                        className="h-11"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cedula">Cédula</Label>
                        <Input
                          id="cedula"
                          defaultValue={usuario?.usuario.cedula || ""}
                          placeholder="Número de cédula"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          defaultValue={usuario?.usuario.telefono || ""}
                          placeholder="Número de teléfono"
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                        <Input
                          id="fecha_nacimiento"
                          type="date"
                          defaultValue={usuario?.usuario.fecha_nacimiento || ""}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="genero">Género</Label>
                        <Select defaultValue={usuario?.usuario.genero || ""}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona tu género" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Textarea
                        id="direccion"
                        defaultValue={usuario?.usuario.direccion || ""}
                        placeholder="Ingresa tu dirección completa"
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setProfileOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="photos" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Foto de Perfil */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Foto de Perfil
                    </CardTitle>
                    <CardDescription>Esta imagen aparecerá en tu perfil público</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-muted">
                          <AvatarImage src={profileImage || ""} alt="Foto de perfil" />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        {profileImage && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                            onClick={() => removeImage("profile")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {profileImage ? "Cambiar Foto" : "Subir Foto"}
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "profile")}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rostro de Perfil */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scan className="h-5 w-5" />
                      Rostro de Perfil
                    </CardTitle>
                    <CardDescription>Para reconocimiento facial y seguridad adicional</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      {!isCapturingFace ? (
                        <>
                          <div className="relative">
                            <div className="h-32 w-32 border-4 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center bg-muted/50">
                              {faceImage ? (
                                <img
                                  src={faceImage || "/placeholder.svg"}
                                  alt="Rostro registrado"
                                  className="h-full w-full object-cover rounded-lg"
                                />
                              ) : (
                                <Camera className="h-12 w-12 text-muted-foreground/50" />
                              )}
                            </div>
                            {faceImage && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                                onClick={() => removeImage("face")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 w-full">
                            <Button
                              type="button"
                              onClick={startFaceCapture}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            >
                              <Camera className="mr-2 h-4 w-4" />
                              {faceImage ? "Recapturar Rostro" : "Capturar Rostro"}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4 w-full">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={captureFace}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Capturar
                            </Button>
                            <Button type="button" variant="outline" onClick={stopFaceCapture} className="flex-1">
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {faceImage && !isCapturingFace && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-700">
                          <Check className="h-4 w-4" />
                          <span className="text-sm font-medium">Rostro registrado correctamente</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </TabsContent>

            <TabsContent value="academic" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Información Académica
                  </CardTitle>
                  <CardDescription>Detalles de tu perfil como estudiante</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Código de Estudiante</Label>
                      <Input value={usuario?.estudiante?.codigo || ""} disabled className="bg-muted h-11 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label>Rol</Label>
                      <div className="flex items-center h-11">
                        <Badge className="text-sm px-3 py-1">
                          {usuario?.usuario.rol}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nivel Académico</Label>
                    <Select defaultValue={usuario?.estudiante?.nivel_id?.toString() || ""}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecciona tu nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Primer Nivel</SelectItem>
                        <SelectItem value="2">Segundo Nivel</SelectItem>
                        <SelectItem value="3">Tercer Nivel</SelectItem>
                        <SelectItem value="4">Cuarto Nivel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">Estado de la cuenta</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="capitalize">{usuario?.usuario.estado || "Activo"}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Fecha de registro</Label>
                      <p className="mt-1">{usuario?.usuario.fecha_creacion || "No disponible"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Dialog de Configuración */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Settings className="h-6 w-6" />
              Configuración
            </DialogTitle>
            <DialogDescription>Gestiona tus preferencias y configuraciones de cuenta</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Seguridad
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <form onSubmit={handleSettingsSave} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Apariencia y Idioma
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="idioma">Idioma</Label>
                        <Select defaultValue="es">
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">🇪🇸 Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tema">Tema</Label>
                        <Select defaultValue="system">
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">☀️ Claro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setSettingsOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Guardar Configuración
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Preferencias de Notificaciones
                  </CardTitle>
                  <CardDescription>Controla qué notificaciones quieres recibir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones por email</Label>
                        <p className="text-sm text-muted-foreground">Recibir actualizaciones importantes por correo</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones push</Label>
                        <p className="text-sm text-muted-foreground">Notificaciones en tiempo real en el navegador</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Recordatorios de tareas</Label>
                        <p className="text-sm text-muted-foreground">Recordatorios sobre tareas pendientes</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-red-500" />
                    Cambiar Contraseña
                  </CardTitle>
                  <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña Actual</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Ingresa tu contraseña actual"
                          required
                          className="h-11 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Ingresa tu nueva contraseña"
                          required
                          className="h-11 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirma tu nueva contraseña"
                          required
                          className="h-11 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-blue-900">Requisitos de contraseña:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          Mínimo 8 caracteres
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          Al menos una letra mayúscula
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          Al menos una letra minúscula
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          Al menos un número
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          Al menos un carácter especial
                        </li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Cambiar Contraseña
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>

    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <AvatarImageCustom src={userAvatar || "/placeholder.svg?height=32&width=32"} alt={userName} size="md" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
