export const ROUTE_NAMES = {
  HOME: "Home",
  LOGIN: "Login",
  // Añade más rutas aquí...
} as const; // `as const` para inferencia literal de tipos

// Tipo derivado para autocompletado
export type RouteName = keyof typeof ROUTE_NAMES;
