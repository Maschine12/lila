"use client";

import { useState, useEffect, useMemo } from "react";
import FlorAmarilla from "./FlorAmarilla";
import FlorRosada from "./FlorRosada";
import Carta from "./Carta";
import { PERSONALIZATION } from "../types/contants";

const Presentacion = () => {
  const [flowersHidden, setFlowersHidden] = useState<number[]>([]);
  const [showCarta, setShowCarta] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Detectar dispositivos móviles y capacidades de rendimiento
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

    const detectPerformance = () => {
      // Detectar dispositivos de baja potencia
      interface NavigatorConnection {
        effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
      }

      interface ExtendedNavigator extends Navigator {
        connection?: NavigatorConnection;
        mozConnection?: NavigatorConnection;
        webkitConnection?: NavigatorConnection;
        deviceMemory?: number;
      }

      const nav = navigator as ExtendedNavigator;
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
      const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === '3g';

      // Detectar RAM limitada (experimental)
      const limitedMemory = nav.deviceMemory && nav.deviceMemory <= 4;

      // Detectar CPU limitada
      const limitedCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

      // Detectar pantallas de alta densidad que pueden impactar rendimiento
      const highDPR = window.devicePixelRatio > 2;

      return slowConnection || limitedMemory || limitedCPU || (detectMobile() && highDPR);
    };

    // Detectar inmediatamente al montar el componente
    const mobile = detectMobile();
    setIsMobile(mobile);
    setIsLowPerformance(detectPerformance());

    // Marcar como inicializado después de un frame para evitar parpadeos
    requestAnimationFrame(() => {
      setIsInitialized(true);
    });

    // Solo escuchar resize si es necesario para cambios de orientación
    const handleResize = () => {
      const newIsMobile = detectMobile();
      if (newIsMobile !== mobile) {
        setIsMobile(newIsMobile);
        setIsLowPerformance(detectPerformance());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Memoizar flowerData para evitar recálculos y reposicionamiento
  const flowerData = useMemo(() => {
    return baseFlowerData.map((flower, index) => ({
      ...flower,
      originalIndex: index, // Mantener índice original
      size: isMobile ? Math.round(flower.size * 0.6) : flower.size,
      // Marcar si debe ser visible según rendimiento
      shouldRender: isLowPerformance ? index % 2 === 0 : true,
    }));
  }, [isMobile, isLowPerformance]);

  // No renderizar hasta que sepamos el tipo de dispositivo y esté inicializado
  if (isMobile === null || !isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 flex items-center justify-center">
        <div className="text-white text-2xl">
          {PERSONALIZATION.extraMessages.loading}
        </div>
      </div>
    );
  }

  const handleFlowerClick = () => {
    // Prevenir múltiples clics y asegurar que esté inicializado
    if (flowersHidden.length > 0 || audioPlaying || !isInitialized) return;

    console.log("🌻 Click detected! Starting flower fall animation"); // Debug

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

    // Ajustar timing según rendimiento del dispositivo
    const groupDelay = isLowPerformance ? 400 : isMobile ? 500 : 640;
    const finalDelay = isLowPerformance ? 1500 : 2500;

    groups.forEach((group, groupIndex) => {
      setTimeout(() => {
        console.log(`Hiding group ${groupIndex}:`, group); // Debug
        setFlowersHidden((prev) => [...prev, ...group]);
      }, groupIndex * groupDelay);
    });

    // Mostrar carta después de que todas las flores caigan
    setTimeout(() => {
      setShowCarta(true);
    }, groups.length * groupDelay + finalDelay);
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 cursor-pointer"
      onClick={handleFlowerClick}
      style={{ overflow: flowersHidden.length > 0 ? 'visible' : 'hidden' }}
    >
      {/* Título de guía mejorado */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-1000 ${
          flowersHidden.length > 0
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <div className={`relative group cursor-pointer transform transition-all duration-300 ${
          isLowPerformance ? "" : "hover:scale-105 active:scale-95"
        }`}>
          {/* Efecto de resplandor - reducido en dispositivos de bajo rendimiento */}
          <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400 rounded-2xl blur-xl opacity-75 ${
            isLowPerformance ? "" : "group-hover:opacity-100 animate-pulse"
          }`}></div>

          {/* Botón principal */}
          <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50 border-4 border-yellow-300/50 px-8 py-6 rounded-2xl backdrop-blur-sm shadow-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-rose-500 bg-clip-text text-transparent text-center drop-shadow-lg">
              {PERSONALIZATION.buttonText}
            </h1>

            {/* Flores decorativas en el botón - reducidas en dispositivos de bajo rendimiento */}
            {!isLowPerformance && (
              <>
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
              </>
            )}
          </div>

          {/* Partículas flotantes alrededor - solo en dispositivos de alto rendimiento */}
          {!isLowPerformance && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Flores */}
      {flowerData.map((flower, index) => {
        // Solo renderizar flores que deben ser visibles
        if (!flower.shouldRender) return null;

        const isHidden = flowersHidden.includes(flower.originalIndex);

        // DEBUG: Desactivar TODAS las animaciones CSS temporalmente
        const getAnimationClass = () => {
          return ""; // Sin animaciones para debug
        };

        return (
          <div
            key={flower.originalIndex} // Usar índice original como key estable
            className={`absolute pointer-events-none ${!isHidden ? getAnimationClass() : ""}`}
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              // Transform centrado estable
              transform: "translate(-50%, -50%)",
              zIndex: isHidden ? 1 : 10,
              opacity: 1,
              // Solo cuando está oculta, aplicar el transform de caída
              ...(isHidden && {
                transform: `translate(-50%, -50%) translateY(150vh) ${
                  isLowPerformance ? "" : `rotate(${180 + flower.originalIndex * 45}deg)`
                }`,
                opacity: 0,
                backgroundColor: 'red', // DEBUG: Ver si cambia
                border: '3px solid yellow', // DEBUG: Ver si cambia
              }),
              // Transición específica para transform y opacity
              transition: isInitialized
                ? `transform ${
                    isLowPerformance ? "2000ms" : isMobile ? "2500ms" : "3500ms"
                  } ${
                    isLowPerformance ? "ease-out" : "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  }, opacity 500ms ease-out`
                : "none",
              // Animaciones de flotación solo cuando no está oculta
              ...(isInitialized && !isHidden && !isLowPerformance && {
                animationDelay: `${flower.originalIndex * 0.15}s`,
                animationDuration: `${4 + (flower.originalIndex % 4)}s`,
              }),
              // Performance optimization
              willChange: isHidden ? "transform, opacity" : "auto",
            }}
          >
            {flower.type === "yellow" ? (
              <FlorAmarilla
                size={flower.size}
                delay={isLowPerformance ? 0 : flower.originalIndex * 0.01}
              />
            ) : (
              <FlorRosada
                size={flower.size}
                delay={isLowPerformance ? 0 : flower.originalIndex * 0.01}
              />
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

        /* Prevenir interferencia entre animaciones CSS y transiciones */
        .animate-float,
        .animate-gentle-sway,
        .animate-petal-dance {
          animation-fill-mode: both;
        }

        /* Desactivar animaciones CSS cuando se está deslizando */
        .absolute.pointer-events-none[style*="translateY(120vh)"] {
          animation: none !important;
        }

        /* Asegurar que overflow no oculte las flores durante la caída */
        .relative.min-h-screen {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
};

export default Presentacion;
