import React, { useEffect, type RefObject } from "react";

interface CamaraProps {
  referenciaVideo: RefObject<HTMLVideoElement | null>;
}

const Camara: React.FC<CamaraProps> = ({ referenciaVideo }) => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (referenciaVideo.current) {
          referenciaVideo.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error("No se pudo acceder a la cámara:", error);
      });
  }, [referenciaVideo]);

  return <video ref={referenciaVideo} autoPlay playsInline  width="100%" className="object-cover m-auto"/>;
};

export default Camara;
