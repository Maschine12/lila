"use client";

import { useState, useEffect } from "react";
import FlorAmarilla from "./FlorAmarilla";
import FlorRosada from "./FlorRosada";
import Carta from "./Carta";
import { PERSONALIZATION } from "../types/contants";

const Presentacion = () => {
  const [flowersHidden, setFlowersHidden] = useState<number[]>([]);
  const [showCarta, setShowCarta] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [isMuted, setIsMuted] = useState(false);

  // Detectar dispositivos móviles en la primera carga
  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      const isSmallScreen = window.innerWidth <= 768;
      return isMobileDevice || isSmallScreen;
    };

    // Detectar inmediatamente al montar el componente
    setIsMobile(detectMobile());

    // Solo escuchar resize si es necesario para cambios de orientación
    const handleResize = () => {
      const newIsMobile = detectMobile();
      setIsMobile(newIsMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // No renderizar hasta que sepamos el tipo de dispositivo
  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 flex items-center justify-center">
        <div className="text-white text-2xl">
          {PERSONALIZATION.extraMessages.loading}
        </div>
      </div>
    );
  }

  // 20 flores amarillas + 5 flores rosadas con posiciones en bordes y tamaños diversos
  const baseFlowerData = [
    // Flores amarillas - Bordes superiores e inferiores
    { x: 2, y: 8, size: 180, type: "yellow" },
    { x: 98, y: 5, size: 60, type: "yellow" },
    { x: 15, y: 2, size: 140, type: "yellow" },
    { x: 85, y: 95, size: 200, type: "yellow" },
    { x: 45, y: 98, size: 80, type: "yellow" },
    { x: 72, y: 3, size: 160, type: "yellow" },

    // Flores amarillas - Bordes izquierdo y derecho
    { x: 1, y: 25, size: 120, type: "yellow" },
    { x: 99, y: 75, size: 90, type: "yellow" },
    { x: 3, y: 60, size: 175, type: "yellow" },
    { x: 97, y: 35, size: 110, type: "yellow" },
    { x: 2, y: 85, size: 50, type: "yellow" },
    { x: 98, y: 50, size: 195, type: "yellow" },

    // Flores amarillas - Centro caótico
    { x: 25, y: 40, size: 70, type: "yellow" },
    { x: 65, y: 30, size: 150, type: "yellow" },
    { x: 35, y: 70, size: 100, type: "yellow" },
    { x: 55, y: 55, size: 85, type: "yellow" },
    { x: 40, y: 25, size: 135, type: "yellow" },
    { x: 75, y: 65, size: 45, type: "yellow" },

    // Flores amarillas - Esquinas
    { x: 8, y: 12, size: 165, type: "yellow" },
    { x: 88, y: 88, size: 75, type: "yellow" },

    // Flores rosadas - Posiciones estratégicas
    { x: 20, y: 15, size: 130, type: "pink" },
    { x: 80, y: 20, size: 95, type: "pink" },
    { x: 12, y: 75, size: 145, type: "pink" },
    { x: 90, y: 65, size: 110, type: "pink" },
    { x: 50, y: 45, size: 125, type: "pink" },
  ];

  // Aplicar reducción de 40% para móviles (solo se calcula una vez)
  const flowerData = baseFlowerData.map((flower) => ({
    ...flower,
    size: isMobile ? Math.round(flower.size * 0.6) : flower.size,
  }));

  const handleFlowerClick = () => {
    // Prevenir múltiples clics
    if (flowersHidden.length > 0 || audioPlaying) return;

    // Reproducir audio en bucle
    const audio = new Audio("/sounds/flores_amarillas.mp3");
    audio.loop = true; // Hacer que se repita en bucle
    setAudioPlaying(true);
    setAudioElement(audio); // Guardar referencia del audio

    audio.play().catch((error) => {
      console.log("Error al reproducir audio:", error);
    });

    // Caída escalonada por grupos
    const totalFlowers = flowerData.length;

    // Crear grupos de flores para caída escalonada (incluyendo flores rosadas)
    const groups = [
      [0, 1, 2, 3, 4, 5], // Primer grupo - bordes superiores amarillas
      [6, 7, 8, 9, 10, 11], // Segundo grupo - bordes laterales amarillas
      [12, 13, 14, 15, 16, 17], // Tercer grupo - centro amarillas
      [18, 19, 20, 21], // Cuarto grupo - esquinas amarillas + primeras rosadas
      [22, 23, 24], // Quinto grupo - últimas flores rosadas
    ];

    groups.forEach((group, groupIndex) => {
      setTimeout(() => {
        setFlowersHidden((prev) => [...prev, ...group]);
      }, groupIndex * 640); // 640ms entre cada grupo (20% menos que 800ms)
    });

    // Mostrar carta después de que todas las flores caigan
    setTimeout(() => {
      setShowCarta(true);
    }, groups.length * 640 + 2500);
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 overflow-hidden cursor-pointer"
      onClick={handleFlowerClick}
    >
      {/* Título de guía mejorado */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-1000 ${
          flowersHidden.length > 0
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95">
          {/* Efecto de resplandor */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse"></div>

          {/* Botón principal */}
          <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50 border-4 border-yellow-300/50 px-8 py-6 rounded-2xl backdrop-blur-sm shadow-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-rose-500 bg-clip-text text-transparent text-center drop-shadow-lg">
              {PERSONALIZATION.buttonText}
            </h1>

            {/* Flores decorativas en el botón */}
            <div className="absolute -top-3 -left-3 animate-float">
              <span className="text-3xl">🌻</span>
            </div>
            <div className="absolute -top-2 -right-3 animate-float delay-200">
              <span className="text-2xl">🌸</span>
            </div>
            <div className="absolute -bottom-3 -left-2 animate-float delay-400">
              <span className="text-2xl">🌼</span>
            </div>
            <div className="absolute -bottom-2 -right-3 animate-float delay-600">
              <span className="text-3xl">💛</span>
            </div>
          </div>

          {/* Partículas flotantes alrededor */}
          <div className="absolute -top-8 left-1/4 animate-float delay-100">
            <span className="text-xl opacity-70">✨</span>
          </div>
          <div className="absolute -top-6 right-1/4 animate-float delay-300">
            <span className="text-lg opacity-70">💫</span>
          </div>
          <div className="absolute -bottom-8 left-1/3 animate-float delay-500">
            <span className="text-xl opacity-70">🌟</span>
          </div>
          <div className="absolute -bottom-6 right-1/3 animate-float delay-700">
            <span className="text-lg opacity-70">✨</span>
          </div>
        </div>
      </div>

      {/* Flores */}
      {flowerData.map((flower, index) => {
        const isHidden = flowersHidden.includes(index);

        // Diferentes animaciones según el tipo y posición
        const getAnimationClass = () => {
          if (flower.type === "pink") {
            return index % 2 === 0
              ? "animate-petal-dance"
              : "animate-gentle-sway";
          } else {
            return index % 3 === 0 ? "animate-float" : "animate-gentle-sway";
          }
        };

        return (
          <div
            key={index}
            className={`absolute transition-all ease-out pointer-events-none ${getAnimationClass()} ${
              isHidden ? "translate-y-[120vh] opacity-0" : ""
            }`}
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              // CORRECCIÓN: Mantener siempre el mismo transform como base
              transform: isHidden
                ? `translate(-50%, -50%) translateY(120vh) rotate(${
                    180 + index * 45
                  }deg)`
                : "translate(-50%, -50%)",
              zIndex: isHidden ? 1 : 10,
              transitionDuration: isHidden ? "3500ms" : "300ms",
              transitionTimingFunction: isHidden
                ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "ease-out",
              animationDelay: `${index * 0.15}s`,
              animationDuration: `${4 + (index % 4)}s`,
            }}
          >
            {flower.type === "yellow" ? (
              <FlorAmarilla size={flower.size} delay={index * 0.01} />
            ) : (
              <FlorRosada size={flower.size} delay={index * 0.01} />
            )}
          </div>
        );
      })}

      {/* Componente Carta */}
      <Carta
        showCarta={showCarta}
        audioElement={audioElement}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Presentacion;
