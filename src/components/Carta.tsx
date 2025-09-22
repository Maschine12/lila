'use client';

import React, { useState, useEffect } from 'react';
import FlorAmarilla from './FlorAmarilla';
import FlorRosada from './FlorRosada';
import { PERSONALIZATION } from '../types/contants';

interface CartaProps {
  showCarta: boolean;
  audioElement: HTMLAudioElement | null;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onRestart?: () => void;
}

const Carta: React.FC<CartaProps> = ({ showCarta, audioElement, isMuted, setIsMuted, onRestart }) => {
  const [viewportData, setViewportData] = useState({
    width: 0,
    height: 0,
    availableHeight: 0,
    devicePixelRatio: 1,
    isMobile: false
  });

  // Detectar viewport específico del dispositivo
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const availableHeight = window.screen.availHeight || height;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const isMobile = width <= 768;

      setViewportData({
        width,
        height,
        availableHeight,
        devicePixelRatio,
        isMobile
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  if (!showCarta) return null;

  // Función para calcular tamaño de fuente: MENOS TEXTO = LETRA MÁS GRANDE
  const getAdaptiveFontSizeForParagraph = (text: string, paragraphType: string) => {
    const { width, height, devicePixelRatio, isMobile } = viewportData;
    const textLength = text.length;

    // Factor de escala basado en viewport
    const baseViewportWidth = 375;
    const scaleFactor = Math.max(0.8, Math.min(1.5, width / baseViewportWidth));

    // Configuración por tipo de párrafo con enfoque en MENOS TEXTO = MÁS GRANDE
    const paragraphConfig = {
      title: {
        baseSize: isMobile ? 28 : 42,
        minSize: isMobile ? 20 : 28,
        maxSize: isMobile ? 36 : 52,
        // Umbrales de longitud: texto muy corto a muy largo
        lengthBreakpoints: [20, 40, 80],
        // Multiplicadores: texto corto = grande, texto largo = pequeño
        sizeMultipliers: [1.3, 1.1, 0.9, 0.7]
      },
      message: {
        baseSize: isMobile ? 22 : 34,
        minSize: isMobile ? 16 : 22,
        maxSize: isMobile ? 30 : 42,
        // Para mensajes: basado en análisis real (mensaje1=197chars, mensaje2=100chars)
        lengthBreakpoints: [50, 100, 150],
        sizeMultipliers: [1.5, 1.2, 1.0, 0.7]
      },
      signature: {
        baseSize: isMobile ? 22 : 36,
        minSize: isMobile ? 16 : 24,
        maxSize: isMobile ? 30 : 44,
        lengthBreakpoints: [15, 25, 40],
        sizeMultipliers: [1.5, 1.3, 1.1, 0.9]
      },
      sender: {
        baseSize: isMobile ? 18 : 30,
        minSize: isMobile ? 14 : 22,
        maxSize: isMobile ? 24 : 38,
        lengthBreakpoints: [10, 20, 35],
        sizeMultipliers: [1.4, 1.2, 1.0, 0.8]
      }
    };

    const config = paragraphConfig[paragraphType as keyof typeof paragraphConfig] || paragraphConfig.message;

    // Determinar multiplicador basado en longitud: MENOS TEXTO = MULTIPLICADOR MAYOR
    let sizeMultiplier = config.sizeMultipliers[config.sizeMultipliers.length - 1]; // Último (más pequeño)

    for (let i = 0; i < config.lengthBreakpoints.length; i++) {
      if (textLength <= config.lengthBreakpoints[i]) {
        sizeMultiplier = config.sizeMultipliers[i]; // Primer match = texto más corto = multiplicador mayor
        break;
      }
    }

    // Calcular tamaño final
    let finalSize = config.baseSize * sizeMultiplier * scaleFactor;

    // Aplicar límites
    finalSize = Math.max(config.minSize, Math.min(config.maxSize, finalSize));

    // Ajuste por densidad de píxeles
    const dprAdjustment = devicePixelRatio > 2 ? 0.95 : 1;
    finalSize = Math.round(finalSize * dprAdjustment);

    return {
      fontSize: `${finalSize}px`,
      lineHeight: paragraphType === 'title' ? '1.2' : '1.4'
    };
  };

  const toggleMute = () => {
    if (audioElement) {
      audioElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md animate-fade-in flex items-center justify-center">
      {/* Contenedor adaptativo sin scroll */}
      <div className="relative w-[95vw] h-[95vh] max-w-4xl
        bg-gradient-to-br from-yellow-50 via-rose-50 to-orange-50
        rounded-2xl md:rounded-3xl
        shadow-2xl border-4 border-yellow-200/50
        animate-scale-in overflow-hidden
        flex flex-col">

        {/* Marco decorativo optimizado - solo en desktop */}
        <div className="hidden md:block absolute top-6 left-6 animate-float z-5">
          <FlorAmarilla size={32} />
        </div>
        <div className="hidden md:block absolute top-6 right-6 animate-float delay-200 z-5">
          <FlorRosada size={30} />
        </div>
        <div className="hidden md:block absolute bottom-6 left-6 animate-float delay-400 z-5">
          <FlorRosada size={34} />
        </div>
        <div className="hidden md:block absolute bottom-6 right-6 animate-float delay-600 z-5">
          <FlorAmarilla size={32} />
        </div>

        {/* Flores laterales solo en pantallas grandes */}
        <div className="hidden lg:block absolute top-1/4 left-3 animate-float delay-300 z-5">
          <FlorRosada size={24} />
        </div>
        <div className="hidden lg:block absolute top-1/4 right-3 animate-float delay-500 z-5">
          <FlorAmarilla size={22} />
        </div>
        <div className="hidden lg:block absolute bottom-1/4 left-3 animate-float delay-700 z-5">
          <FlorAmarilla size={26} />
        </div>
        <div className="hidden lg:block absolute bottom-1/4 right-3 animate-float delay-900 z-5">
          <FlorRosada size={24} />
        </div>

        {/* Elementos decorativos adaptados */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-rose-100/20 rounded-2xl md:rounded-3xl"></div>
        
        {/* Contenido principal - optimizado sin scroll */}
        <div className="relative z-10 text-center flex-1 flex flex-col justify-center p-4 md:p-8 space-y-4 md:space-y-6">
          
          {/* Título con tamaño adaptativo por viewport */}
          <h1
            className="font-bold bg-gradient-to-r from-rose-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm"
            style={getAdaptiveFontSizeForParagraph(PERSONALIZATION.title, 'title')}
          >
            {PERSONALIZATION.title}
          </h1>
            
          {/* Mensaje principal responsive */}
          <div className="animate-slide-up delay-300 flex-1 flex flex-col justify-center">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-yellow-200/30 mx-auto">
              <p
                className="text-gray-800 font-medium"
                style={getAdaptiveFontSizeForParagraph(PERSONALIZATION.message.first, 'message')}
              >
                {PERSONALIZATION.message.first}
              </p>
              <p
                className="text-gray-700 font-medium mt-2 md:mt-4"
                style={getAdaptiveFontSizeForParagraph(PERSONALIZATION.message.second, 'message')}
              >
                {PERSONALIZATION.message.second}
              </p>
            </div>
          </div>
          
          {/* Firma responsive */}
          <div className="animate-fade-in delay-900">
            <div className="bg-gradient-to-r from-yellow-100/50 via-rose-100/50 to-orange-100/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-yellow-300/40 shadow-md">
              <p
                className="text-yellow-800 font-bold italic"
                style={getAdaptiveFontSizeForParagraph(PERSONALIZATION.signature, 'signature')}
              >
                {PERSONALIZATION.signature}
              </p>
              <p
                className="text-yellow-700 font-medium mt-1 md:mt-2"
                style={getAdaptiveFontSizeForParagraph(PERSONALIZATION.sender, 'sender')}
              >
                - {PERSONALIZATION.sender}
              </p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-2 md:mt-4"></div>
            </div>
          </div>

          {/* Flores giratorias responsive */}
          <div className="animate-fade-in delay-1200">
            <div className="flex justify-center items-center space-x-4 md:space-x-6">
              <div className="animate-spin-slow">
                <FlorRosada size={30} className="sm:w-9 sm:h-9 md:w-12 md:h-12" />
              </div>
              <div className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDelay: '0.5s' }}>
                <FlorAmarilla size={35} className="sm:w-10 sm:h-10 md:w-14 md:h-14" />
              </div>
              <div className="animate-spin-slow" style={{ animationDelay: '1s' }}>
                <FlorRosada size={28} className="sm:w-8 sm:h-8 md:w-11 md:h-11" />
              </div>
            </div>
          </div>
        </div>

        {/* Botones responsive */}
        <button
          onClick={handleRestart}
          className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-20"
          aria-label="Reiniciar aplicación"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-rose-600"
          >
            <path
              d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 3v5h5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={toggleMute}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-20"
          aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
        >
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-yellow-600 transition-all duration-300 ${isMuted ? 'opacity-30' : 'opacity-100'}`}
            >
              <path
                d="M11 5L6 9H2v6h4l5 4V5z"
                fill="currentColor"
                className="animate-pulse"
              />

              {!isMuted && (
                <>
                  <path
                    d="M15.54 8.46a5 5 0 0 1 0 7.07"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-ping opacity-75"
                    style={{ animationDuration: '2s' }}
                  />
                  <path
                    d="M19.07 4.93a10 10 0 0 1 0 14.14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-ping opacity-50"
                    style={{ animationDuration: '3s', animationDelay: '0.5s' }}
                  />
                </>
              )}

              {isMuted && (
                <path
                  d="M23 9l-6 6m0-6l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-red-500 animate-bounce"
                />
              )}
            </svg>

            {!isMuted && (
              <>
                <div className="absolute -top-1 -right-1 text-xs animate-float delay-100">🎵</div>
                <div className="absolute -top-1 -right-2 text-xs animate-float delay-500">🎶</div>
                <div className="absolute -bottom-1 -right-1 text-xs animate-float delay-800">🎵</div>
              </>
            )}
          </div>
        </button>

        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent animate-shimmer rounded-2xl md:rounded-3xl"></div>
      </div>
    </div>
  );
};
export default Carta;