import { defineStore } from "pinia";
import type {
  AuthState,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";
import {
  login as apiLogin,
  register as apiRegister,
} from "./../../../api/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
  }),
  actions: {
    async login(payload: LoginRequest) {
      this.isLoading = true;
      try {
        const response = await apiLogin(payload);
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
      } finally {
        this.isLoading = false;
      }
    },
    async register(payload: RegisterRequest) {
      this.isLoading = true;
      try {
        const response = await apiRegister(payload);
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
      } catch (error) {
        console.error("Registration error:", error);
        throw error; // Rethrow the error to handle it in the component if needed
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
