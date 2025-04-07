import { computed } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';

export const useAuth = () => {
  const authStore = useAuthStore();

  // Estado computado
  const user = computed(() => authStore.user);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const isLoading = computed(() => authStore.isLoading);

  // Acciones
  const login = async (credentials: LoginRequest) => {
    try {
      await authStore.login(credentials);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: (error as Error).message || 'Login failed' 
      };
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      await authStore.register(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: (error as Error).message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    authStore.logout();
  };

  return {
    // Estado
    user,
    isAuthenticated,
    isLoading,
    
    // Métodos
    login,
    register,
    logout,
  };
};