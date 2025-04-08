import type { User } from "../../../shared/types/user.types";

// Tipos para el registro (Register)
export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

// Tipos para el login (Login)
export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta común para login/registro
export interface AuthResponse {
  data: {
    token: string;
  };
}

// Tipo para el estado del store (Pinia)
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
