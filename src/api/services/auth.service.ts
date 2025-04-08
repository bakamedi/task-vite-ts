import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../../modules/auth/types/auth.types";
import { apiClient } from "../adapters/axios.adapter";

const apiName = "/auth/";

export const register = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      `${apiName}register`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      `${apiName}login`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
