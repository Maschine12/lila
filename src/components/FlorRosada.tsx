"use client";

// Posiciones fijas para texturas del centro (evita hidratacion error)
const CENTER_TEXTURE_POSITIONS = [
  { left: 30, top: 35 },
  { left: 45, top: 25 },
  { left: 60, top: 40 },
  { left: 25, top: 55 },
  { left: 70, top: 30 },
  { left: 40, top: 65 },
  { left: 55, top: 20 },
  { left: 20, top: 45 },
  { left: 65, top: 60 },
  { left: 35, top: 70 },
  { left: 50, top: 35 },
  { left: 75, top: 50 },
  { left: 30, top: 20 },
  { left: 45, top: 75 },
  { left: 60, top: 25 },
  { left: 25, top: 65 },
  { left: 70, top: 45 },
  { left: 40, top: 30 },
  { left: 55, top: 70 },
  { left: 80, top: 35 },
];

// Helper function para generar elementos circulares
const createCircularElements = (
  count: number,
  angleDivisor: number,
  angleOffset: number = 0
) =>
  Array.from({ length: count }, (_, i) => {
    const angle = ((i * angleDivisor + angleOffset) * Math.PI) / 180;
    return { index: i, angle, cos: Math.cos(angle), sin: Math.sin(angle) };
  });

// Componente de flor rosada y blanca sin hojas
interface FlorRosadaProps {
  size?: number;
  className?: string;
  delay?: number;
  centerX?: number;
  centerY?: number;
}

export default function FlorRosada({
  size = 100,
  className = "",
  delay = 0,
  centerX = 0,
  centerY = 0,
}: FlorRosadaProps) {
  const center = size / 2;

  // Configuraciones optimizadas (sin hojas)
  const config = {
    outerPetals: {
      count: 10,
      widthRatio: 0.45,
      heightRatio: 0.8,
      radiusRatio: 0.4,
      angleDiv: 36,
    },
    middlePetals: {
      count: 8,
      widthRatio: 0.35,
      heightRatio: 0.6,
      radiusRatio: 0.3,
      angleDiv: 45,
      angleOffset: 18,
    },
    innerPetals: {
      count: 6,
      widthRatio: 0.25,
      heightRatio: 0.45,
      radiusRatio: 0.2,
      angleDiv: 60,
      angleOffset: 30,
    },
    center: { sizeRatio: 0.35, textureRatio: 0.04 },
  };

  // Estilos comunes para pétalos
  const commonStyles = {
    position: "absolute" as const,
    transformOrigin: "50% 100%",
    borderRadius: "50% 20% 50% 20%",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        left: `${centerX}px`,
        top: `${centerY}px`,
      }}
    >
      {/* Pétalos externos - Rosa intenso */}
      {createCircularElements(
        config.outerPetals.count,
        config.outerPetals.angleDiv
      ).map(({ index, cos, sin }) => {
        const w = size * config.outerPetals.widthRatio;
        const h = size * config.outerPetals.heightRatio;
        const x = cos * (size * config.outerPetals.radiusRatio);
        const y = sin * (size * config.outerPetals.radiusRatio);

        return (
          <div
            key={index}
            style={{
              ...commonStyles,
              width: `${w}px`,
              height: `${h}px`,
              background:
                "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
              left: `${center - w / 2 + x}px`,
              top: `${center - h + y}px`,
              transform: `rotate(${index * config.outerPetals.angleDiv}deg)`,
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 3px rgba(236,72,153,0.3)",
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Pétalos medios - Rosa suave */}
      {createCircularElements(
        config.middlePetals.count,
        config.middlePetals.angleDiv,
        config.middlePetals.angleOffset
      ).map(({ index, cos, sin }) => {
        const w = size * config.middlePetals.widthRatio;
        const h = size * config.middlePetals.heightRatio;
        const x = cos * (size * config.middlePetals.radiusRatio);
        const y = sin * (size * config.middlePetals.radiusRatio);

        return (
          <div
            key={`middle-${index}`}
            style={{
              ...commonStyles,
              width: `${w}px`,
              height: `${h}px`,
              background:
                "linear-gradient(135deg, #f9a8d4 0%, #f472b6 50%, #ec4899 100%)",
              left: `${center - w / 2 + x}px`,
              top: `${center - h + y}px`,
              transform: `rotate(${
                index * config.middlePetals.angleDiv +
                config.middlePetals.angleOffset
              }deg)`,
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              zIndex: 2,
            }}
          />
        );
      })}

      {/* Pétalos internos - Blanco con toque rosa */}
      {createCircularElements(
        config.innerPetals.count,
        config.innerPetals.angleDiv,
        config.innerPetals.angleOffset
      ).map(({ index, cos, sin }) => {
        const w = size * config.innerPetals.widthRatio;
        const h = size * config.innerPetals.heightRatio;
        const x = cos * (size * config.innerPetals.radiusRatio);
        const y = sin * (size * config.innerPetals.radiusRatio);

        return (
          <div
            key={`inner-${index}`}
            style={{
              ...commonStyles,
              width: `${w}px`,
              height: `${h}px`,
              background:
                "linear-gradient(135deg, #ffffff 0%, #fce7f3 50%, #f9a8d4 100%)",
              left: `${center - w / 2 + x}px`,
              top: `${center - h + y}px`,
              transform: `rotate(${
                index * config.innerPetals.angleDiv +
                config.innerPetals.angleOffset
              }deg)`,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              zIndex: 3,
            }}
          />
        );
      })}

      {/* Centro - Rosa dorado */}
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          width: `${size * config.center.sizeRatio}px`,
          height: `${size * config.center.sizeRatio}px`,
          left: `${center - (size * config.center.sizeRatio) / 2}px`,
          top: `${center - (size * config.center.sizeRatio) / 2}px`,
          background: "radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
          boxShadow:
            "inset 0 2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(251,191,36,0.4)",
          zIndex: 4,
        }}
      >
        {/* Texturas del centro */}
        {CENTER_TEXTURE_POSITIONS.map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              width: `${size * config.center.textureRatio}px`,
              height: `${size * config.center.textureRatio}px`,
              background: "#ea580c",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}