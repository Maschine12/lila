'use client';

import React from 'react';
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
  if (!showCarta) return null;

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md animate-fade-in p-2 sm:p-4 lg:p-6">
      <div className="relative bg-gradient-to-br from-yellow-50 via-rose-50 to-orange-50 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl border-4 border-yellow-200/50 p-10 sm:p-12 lg:p-16 xl:p-20 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl animate-scale-in min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]" style={{ overflow: 'visible' }}>

        {/* Marco decorativo con flores - distribución creativa */}
        <div className="absolute top-4 left-4 animate-float z-5">
          <FlorAmarilla size={45} className="sm:scale-110 lg:scale-125" />
        </div>
        <div className="absolute top-4 right-4 animate-float delay-200 z-5">
          <FlorRosada size={42} className="sm:scale-110 lg:scale-125" />
        </div>
        <div className="absolute bottom-4 left-4 animate-float delay-400 z-5">
          <FlorRosada size={48} className="sm:scale-110 lg:scale-125" />
        </div>
        <div className="absolute bottom-4 right-4 animate-float delay-600 z-5">
          <FlorAmarilla size={44} className="sm:scale-110 lg:scale-125" />
        </div>

        {/* Flores laterales medianas - equilibradas */}
        <div className="absolute top-1/4 left-2 animate-float delay-300 z-5">
          <FlorRosada size={32} className="sm:scale-110" />
        </div>
        <div className="absolute top-1/4 right-2 animate-float delay-500 z-5">
          <FlorAmarilla size={30} className="sm:scale-110" />
        </div>
        <div className="absolute bottom-1/4 left-2 animate-float delay-700 z-5">
          <FlorAmarilla size={34} className="sm:scale-110" />
        </div>
        <div className="absolute bottom-1/4 right-2 animate-float delay-900 z-5">
          <FlorRosada size={31} className="sm:scale-110" />
        </div>

        {/* Flores superiores e inferiores - como ribete */}
        <div className="absolute top-2 left-1/4 animate-float delay-100 z-5">
          <FlorAmarilla size={22} />
        </div>
        <div className="absolute top-2 right-1/4 animate-float delay-800 z-5">
          <FlorRosada size={20} />
        </div>
        <div className="absolute bottom-2 left-1/4 animate-float delay-1100 z-5">
          <FlorRosada size={24} />
        </div>
        <div className="absolute bottom-2 right-1/4 animate-float delay-1400 z-5">
          <FlorAmarilla size={21} />
        </div>

        {/* Flores centro-laterales para enmarcar mejor */}
        <div className="absolute top-1/2 left-1 animate-float delay-1600 z-5 transform -translate-y-1/2">
          <FlorRosada size={28} />
        </div>
        <div className="absolute top-1/2 right-1 animate-float delay-1800 z-5 transform -translate-y-1/2">
          <FlorAmarilla size={26} />
        </div>

        {/* Partículas brillantes - alejadas del contenido central */}
        <div className="absolute top-12 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
        <div className="absolute top-14 right-8 w-1 h-1 bg-pink-400 rounded-full animate-sparkle delay-300"></div>
        <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-sparkle delay-600"></div>
        <div className="absolute bottom-14 right-8 w-1 h-1 bg-pink-300 rounded-full animate-sparkle delay-900"></div>

        {/* Elementos decorativos creativos */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-rose-100/20 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem]"></div>
        <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-100/10 to-rose-100/10 rounded-full blur-2xl"></div>

        {/* Contenido principal con mayor espaciado */}
        <div className="relative z-10 text-center space-y-8 sm:space-y-10 lg:space-y-12 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
          {/* Título con efecto gradiente */}
          <div className="animate-slide-down">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-rose-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-sm">
              {PERSONALIZATION.title}
            </h1>
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
              <span className="text-4xl sm:text-5xl lg:text-6xl animate-pulse">💛</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl animate-bounce">✨</span>
              <span className="text-4xl sm:text-5xl lg:text-6xl animate-pulse delay-300">🌸</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl animate-bounce delay-500">💖</span>
              <span className="text-4xl sm:text-5xl lg:text-6xl animate-pulse delay-700">💛</span>
            </div>
          </div>

          {/* Mensaje principal con diseño mejorado */}
          <div className="animate-slide-up delay-300">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-yellow-200/30 max-w-prose mx-auto">
              <p className="text-gray-800 leading-relaxed text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                {PERSONALIZATION.message.first}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium mt-4">
                {PERSONALIZATION.message.second}
              </p>
            </div>
          </div>
          {/* Firma romántica mejorada */}
          <div className="animate-fade-in delay-900">
            <div className="bg-gradient-to-r from-yellow-100/50 via-rose-100/50 to-orange-100/50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-yellow-300/40 shadow-md">
              <p className="text-yellow-800 font-bold italic text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
                {PERSONALIZATION.signature}
              </p>
              <p className="text-yellow-700 font-medium text-lg sm:text-xl lg:text-2xl mt-2">
                - {PERSONALIZATION.sender}
              </p>
              {/* Línea decorativa */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-4 sm:mt-6"></div>
            </div>
          </div>

          {/* Flores giratorias - fuera del card, como elemento independiente */}
          <div className="animate-fade-in delay-1200">
            <div className="flex justify-center items-center space-x-8 sm:space-x-10 lg:space-x-12 mt-6 sm:mt-8">
              <div className="animate-spin-slow">
                <FlorRosada size={50} className="sm:scale-110 lg:scale-125" />
              </div>
              <div className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDelay: '0.5s' }}>
                <FlorAmarilla size={55} className="sm:scale-110 lg:scale-125" />
              </div>
              <div className="animate-spin-slow" style={{ animationDelay: '1s' }}>
                <FlorRosada size={48} className="sm:scale-110 lg:scale-125" />
              </div>
            </div>
          </div>
        </div>

        {/* Botón de reinicio */}
        <button
          onClick={handleRestart}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-20"
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

        {/* Botón de mute/unmute */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-20"
          aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
        >
          <div className="relative">
            {/* Icono de sonido */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-yellow-600 transition-all duration-300 ${isMuted ? 'opacity-30' : 'opacity-100'}`}
            >
              {/* Altavoz base */}
              <path
                d="M11 5L6 9H2v6h4l5 4V5z"
                fill="currentColor"
                className="animate-pulse"
              />

              {/* Ondas de sonido - se ocultan cuando está muteado */}
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

              {/* X para muteado */}
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

            {/* Partículas musicales flotantes */}
            {!isMuted && (
              <>
                <div className="absolute -top-2 -right-1 text-xs animate-float delay-100">🎵</div>
                <div className="absolute -top-1 -right-3 text-xs animate-float delay-500">🎶</div>
                <div className="absolute -bottom-1 -right-2 text-xs animate-float delay-800">🎵</div>
              </>
            )}
          </div>
        </button>

        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent animate-shimmer"></div>
      </div>

      {/* Flores del fondo - más alejadas para evitar solapamiento */}
      <div className="absolute -top-8 -left-8 opacity-15 animate-float hidden sm:block">
        <FlorRosada size={100} />
      </div>
      <div className="absolute -top-12 -right-12 opacity-15 animate-float delay-300 hidden sm:block">
        <FlorAmarilla size={90} />
      </div>
      <div className="absolute -bottom-12 -left-12 opacity-15 animate-float delay-600 hidden md:block">
        <FlorAmarilla size={95} />
      </div>
      <div className="absolute -bottom-8 -right-8 opacity-15 animate-float delay-900 hidden sm:block">
        <FlorRosada size={85} />
      </div>

      {/* Flores laterales externas - bien separadas */}
      <div className="absolute top-1/2 -left-16 opacity-12 animate-float delay-1500 hidden lg:block transform -translate-y-1/2">
        <FlorRosada size={75} />
      </div>
      <div className="absolute top-1/2 -right-16 opacity-12 animate-float delay-1800 hidden lg:block transform -translate-y-1/2">
        <FlorAmarilla size={70} />
      </div>

      {/* Flores superiores e inferiores externas */}
      <div className="absolute -top-16 left-1/2 opacity-10 animate-float delay-2000 hidden xl:block transform -translate-x-1/2">
        <FlorAmarilla size={80} />
      </div>
      <div className="absolute -bottom-16 left-1/2 opacity-10 animate-float delay-2200 hidden xl:block transform -translate-x-1/2">
        <FlorRosada size={75} />
      </div>
    </div>
  );
};

export default Carta;