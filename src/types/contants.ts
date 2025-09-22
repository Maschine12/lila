// Constantes para personalización de la carta romántica
export const PERSONALIZATION = {
  // Nombre de quien recibe la carta
  recipient: "mi pequeña Lila",

  // Nombre de quien envía la carta
  sender: "Richard",

  // Título principal de la carta
  title: "Para mi pequeña Lila",

  // Mensaje principal de la carta
  message: {
    first: "Así como las flores amarillas irradian luz y las rosadas desbordan ternura, tu sonrisa ilumina mis días con la alegría más brillante y la dulzura más elegante. Eres el color más hermoso en mi vida.",
    second: "Eres mi fuente de alegría y pasión, y cada momento a tu lado es un regalo que atesoro profundamente."
  },

  // Texto de la firma
  signature: "Con todo mi amor 💕",

  // Texto del botón inicial
  buttonText: "Presiona aquí pequeña",

  // Mensajes adicionales opcionales
  extraMessages: {
    loading: "Cargando...",
    dedication: "Para ti, con amor infinito ❤️"
  }
} as const;

// Tipos para TypeScript
export type PersonalizationType = typeof PERSONALIZATION;
export type MessageType = typeof PERSONALIZATION.message;