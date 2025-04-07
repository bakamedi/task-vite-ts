// Tipo para el usuario (puede extenderse según tu backend)
export interface User {
  email: string;
  firstName?: string; // Opcional si no viene en la respuesta
  lastName?: string; // Opcional si no viene en la respuesta
  fullName?: string; // Opcional si no viene en la respuesta
}

export interface UserResponse {
  data: User;
}
