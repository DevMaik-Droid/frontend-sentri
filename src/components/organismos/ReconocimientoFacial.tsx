import { useRef, useEffect, useState } from "react";
import Camara from "../atomos/Camara";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  rol: string;
}

interface ResultadoAPI {
  result: string;
  message?: string;
  confianza?: number;
  usuario?: Usuario;
}

export default function ReconocimientoFacial() {
  const referenciaVideo = useRef<HTMLVideoElement>(null);
  const referenciaCanvas = useRef<HTMLCanvasElement>(null);
  const [resultado, setResultado] = useState<ResultadoAPI | null>(null);
  const intervaloEnvio = useRef<number | null>(null);

  // Crear referencia para el audio
  const audioExito = useRef<HTMLAudioElement>(null);

  const reproducirSonido = async () => {
    if (audioExito.current) {
      try {
        audioExito.current.pause();
        audioExito.current.currentTime = 0;
        await audioExito.current.play();
      } catch (error) {
        console.warn("No se pudo reproducir el audio:", error);
      }
    }
  };

  const capturarYEnviar = async () => {
    const video = referenciaVideo.current;
    const canvas = referenciaCanvas.current;

    if (!video || !canvas) return;

    const contexto = canvas.getContext("2d");
    if (!contexto) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imagenBase64 = canvas.toDataURL("image/jpeg");

    try {
      const respuesta = await fetch(
        "http://localhost:5000/usuario/asistencia/registrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagen: imagenBase64 }),
        }
      );

      const datos: ResultadoAPI = await respuesta.json();
      setResultado(datos);

      if (resultado?.result === "ok") {
        await reproducirSonido();
      }
    } catch (error) {
      console.error("Error al enviar imagen:", error);
    }
  };

  useEffect(() => {
    intervaloEnvio.current = window.setInterval(() => {
      capturarYEnviar();
    }, 3000); // cada 3 segundos

    return () => {
      if (intervaloEnvio.current) {
        clearInterval(intervaloEnvio.current);
      }
    };
  });

  return (
    <div>
      <Camara referenciaVideo={referenciaVideo} />
      <audio
        ref={audioExito}
        src="/src/assets/sounds/exito.wav"
        preload="auto"
      />
      <canvas ref={referenciaCanvas} style={{ display: "none" }} />

      {resultado && (
        <div style={{ marginTop: "15px" }}>
          {resultado.result === "ok" ? (
            <p>
              ✅ Usuario reconocido: {resultado.usuario?.nombre}{" "}
              {resultado.usuario?.apellido} <br />
              Rol: {resultado.usuario?.rol} <br />
              Mensaje: {resultado.message} <br />
              Confianza: {resultado.confianza}
            </p>
          ) : (
            <p>❌ {resultado.message}</p>
          )}
        </div>
      )}
      
    </div>
  );
}
