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
    <div className="flex justify-center items-center w-full min-h-screen p-4 fixed inset-0 z-50 bg-black/30 backdrop-blur-md animate-fade-in sm:p-4 lg:p-6 overflow-auto">
      {/* Contenedor adaptativo - móvil vs desktop */}
      <div className="relative w-full h-auto my-auto
        max-w-sm aspect-[3/4] sm:max-w-md sm:aspect-[3/4]
        md:max-w-lg md:aspect-[3/4]
        lg:max-w-2xl lg:aspect-auto lg:max-h-[90vh] lg:min-h-[600px]
        xl:max-w-3xl xl:max-h-[85vh] xl:min-h-[700px]
        bg-gradient-to-br from-yellow-50 via-rose-50 to-orange-50 
        rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] 
        shadow-2xl border-4 border-yellow-200/50 
        p-8 sm:p-10 md:p-10 lg:p-12 xl:p-16
        animate-scale-in min-h-[600px] sm:min-h-[700px] md:min-h-[750px]" 
        style={{ overflow: 'visible' }}>

        {/* Marco decorativo con flores - más grandes en móvil */}
        <div className="absolute top-4 left-4 animate-float z-5">
          <FlorAmarilla size={40} className="sm:size-[45px] lg:scale-125" />
        </div>
        <div className="absolute top-4 right-4 animate-float delay-200 z-5">
          <FlorRosada size={38} className="sm:size-[42px] lg:scale-125" />
        </div>
        <div className="absolute bottom-4 left-4 animate-float delay-400 z-5">
          <FlorRosada size={42} className="sm:size-[48px] lg:scale-125" />
        </div>
        <div className="absolute bottom-4 right-4 animate-float delay-600 z-5">
          <FlorAmarilla size={40} className="sm:size-[44px] lg:scale-125" />
        </div>

        {/* Flores laterales medianas - más grandes en móvil */}
        <div className="absolute top-1/4 left-2 animate-float delay-300 z-5">
          <FlorRosada size={30} className="sm:size-[32px] lg:scale-110" />
        </div>
        <div className="absolute top-1/4 right-2 animate-float delay-500 z-5">
          <FlorAmarilla size={28} className="sm:size-[30px] lg:scale-110" />
        </div>
        <div className="absolute bottom-1/4 left-2 animate-float delay-700 z-5">
          <FlorAmarilla size={32} className="sm:size-[34px] lg:scale-110" />
        </div>
        <div className="absolute bottom-1/4 right-2 animate-float delay-900 z-5">
          <FlorRosada size={30} className="sm:size-[31px] lg:scale-110" />
        </div>

        {/* Flores superiores e inferiores - restauradas para móvil */}
        <div className="absolute top-2 left-1/4 animate-float delay-100 z-5">
          <FlorAmarilla size={20} className="sm:size-[22px]" />
        </div>
        <div className="absolute top-2 right-1/4 animate-float delay-800 z-5">
          <FlorRosada size={18} className="sm:size-[20px]" />
        </div>
        <div className="absolute bottom-2 left-1/4 animate-float delay-1100 z-5">
          <FlorRosada size={22} className="sm:size-[24px]" />
        </div>
        <div className="absolute bottom-2 right-1/4 animate-float delay-1400 z-5">
          <FlorAmarilla size={20} className="sm:size-[21px]" />
        </div>

        {/* Flores centro-laterales */}
        <div className="absolute top-1/2 left-1 animate-float delay-1600 z-5 transform -translate-y-1/2">
          <FlorRosada size={26} className="sm:size-[28px]" />
        </div>
        <div className="absolute top-1/2 right-1 animate-float delay-1800 z-5 transform -translate-y-1/2">
          <FlorAmarilla size={24} className="sm:size-[26px]" />
        </div>

        {/* Elementos decorativos adaptados */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-rose-100/20 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem]"></div>
        
        {/* Contenido principal - optimizado para móvil y desktop */}
        <div className="relative z-10 text-center h-full flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-10 py-6 sm:py-8 lg:py-8 px-4 sm:px-6 lg:px-6">
          
          {/* Título - más grande en móvil, controlado en desktop */}
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-rose-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-4 lg:mb-6 drop-shadow-sm leading-tight">
              {PERSONALIZATION.title}
            </h1>
            
          {/* Mensaje principal - más grande en móvil */}
          <div className="animate-slide-up delay-300 flex-1 flex flex-col justify-center">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-6 lg:p-8 shadow-lg border border-yellow-200/30 max-w-prose mx-auto">
              <p className="text-gray-800 leading-relaxed text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-medium">
                {PERSONALIZATION.message.first}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-medium mt-4">
                {PERSONALIZATION.message.second}
              </p>
            </div>
          </div>
          
          {/* Firma - más grande en móvil */}
          <div className="animate-fade-in delay-900">
            <div className="bg-gradient-to-r from-yellow-100/50 via-rose-100/50 to-orange-100/50 rounded-2xl p-6 sm:p-8 md:p-6 lg:p-8 border border-yellow-300/40 shadow-md">
              <p className="text-yellow-800 font-bold italic text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {PERSONALIZATION.signature}
              </p>
              <p className="text-yellow-700 font-medium text-lg sm:text-xl md:text-lg lg:text-xl mt-2">
                - {PERSONALIZATION.sender}
              </p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-4 sm:mt-6 md:mt-4 lg:mt-6"></div>
            </div>
          </div>

          {/* Flores giratorias - más grandes en móvil */}
          <div className="animate-fade-in delay-1200">
            <div className="flex justify-center items-center space-x-6 sm:space-x-8 md:space-x-6 lg:space-x-8 mt-4 sm:mt-6 md:mt-4 lg:mt-6">
              <div className="animate-spin-slow">
                <FlorRosada size={45} className="sm:size-[50px] lg:scale-110" />
              </div>
              <div className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDelay: '0.5s' }}>
                <FlorAmarilla size={50} className="sm:size-[55px] lg:scale-110" />
              </div>
              <div className="animate-spin-slow" style={{ animationDelay: '1s' }}>
                <FlorRosada size={42} className="sm:size-[48px] lg:scale-110" />
              </div>
            </div>
          </div>
        </div>

        {/* Botones en posiciones fijas - más grandes en móvil */}
        <button
          onClick={handleRestart}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-20"
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
          className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-20"
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent animate-shimmer rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem]"></div>
      </div>

      {/* Flores del fondo - solo en pantallas grandes */}
      <div className="absolute -top-8 -left-8 opacity-15 animate-float hidden lg:block">
        <FlorRosada size={80} />
      </div>
      <div className="absolute -top-12 -right-12 opacity-15 animate-float delay-300 hidden lg:block">
        <FlorAmarilla size={70} />
      </div>
      <div className="absolute -bottom-12 -left-12 opacity-15 animate-float delay-600 hidden xl:block">
        <FlorAmarilla size={75} />
      </div>
      <div className="absolute -bottom-8 -right-8 opacity-15 animate-float delay-900 hidden lg:block">
        <FlorRosada size={65} />
      </div>
    </div>
  );
};
export default Carta;