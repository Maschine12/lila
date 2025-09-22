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
    first: "Como estas flores amarillas que brillan con su propia luz, así iluminas cada día de mi vida con tu sonrisa.",
    second: "Eres mi sol, mi alegría y mi razón de ser."
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