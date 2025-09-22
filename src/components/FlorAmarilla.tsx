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

// Componente de flor amarilla optimizado
interface FlorAmarillaProps {
  size?: number;
  className?: string;
  delay?: number;
  centerX?: number;
  centerY?: number;
}

export default function FlorAmarilla({
  size = 100,
  className = "",
  delay = 0,
  centerX = 0,
  centerY = 0,
}: FlorAmarillaProps) {
  const center = size / 2;

  // Configuraciones optimizadas
  const config = {
    leaves: {
      count: 6,
      widthRatio: 0.2,
      heightRatio: 0.45,
      radiusRatio: 0.75,
      angleDiv: 60,
    },
    outerPetals: {
      count: 12,
      widthRatio: 0.4,
      heightRatio: 0.7,
      radiusRatio: 0.35,
      angleDiv: 30,
    },
    innerPetals: {
      count: 8,
      widthRatio: 0.25,
      heightRatio: 0.5,
      radiusRatio: 0.25,
      angleDiv: 45,
      angleOffset: 22.5,
    },
    center: { sizeRatio: 0.45, textureRatio: 0.045 },
  };

  // Estilos comunes
  const commonStyles = {
    position: "absolute" as const,
    transformOrigin: "50% 100%",
    borderRadius: "50% 10% 50% 10%",
  };

  const leafStyle = { ...commonStyles, borderRadius: "50% 10% 50% 90%" };

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
      {/* Hojas */}
      {createCircularElements(config.leaves.count, config.leaves.angleDiv).map(
        ({ index, cos, sin }) => {
          const w = size * config.leaves.widthRatio;
          const h = size * config.leaves.heightRatio;
          const x = cos * (size * config.leaves.radiusRatio);
          const y = sin * (size * config.leaves.radiusRatio);

          return (
            <div
              key={`leaf-${index}`}
              style={{
                ...leafStyle,
                width: `${w}px`,
                height: `${h}px`,
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                left: `${center - w / 2 + x}px`,
                top: `${center - h + y}px`,
                transform: `rotate(${index * config.leaves.angleDiv}deg)`,
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                zIndex: 1,
              }}
            />
          );
        }
      )}

      {/* Petalos externos */}
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
                "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              left: `${center - w / 2 + x}px`,
              top: `${center - h + y}px`,
              transform: `rotate(${index * config.outerPetals.angleDiv}deg)`,
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)",
              zIndex: 2,
            }}
          />
        );
      })}

      {/* Petalos internos */}
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
                "linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)",
              left: `${center - w / 2 + x}px`,
              top: `${center - h + y}px`,
              transform: `rotate(${
                index * config.innerPetals.angleDiv +
                config.innerPetals.angleOffset
              }deg)`,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
              zIndex: 3,
            }}
          />
        );
      })}

      {/* Centro */}
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          width: `${size * config.center.sizeRatio}px`,
          height: `${size * config.center.sizeRatio}px`,
          left: `${center - (size * config.center.sizeRatio) / 2}px`,
          top: `${center - (size * config.center.sizeRatio) / 2}px`,
          background: "radial-gradient(circle, #92400e 0%, #451a03 100%)",
          boxShadow:
            "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
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
              background: "#78350f",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
