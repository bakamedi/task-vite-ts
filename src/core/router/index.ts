import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../../modules/auth/stores/auth.store";
import { routes } from "./router";
import { ROUTE_NAMES } from "./route-names";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guardia global de navegación
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();

  // Ruta protegida
  if (
    to.meta.requiresAuth &&
    !authStore.isAuthenticated &&
    !localStorage.getItem("token")
  ) {
    next({ name: ROUTE_NAMES.LOGIN });
  }
  // Ruta solo para invitados (ej: login/register)
  else if (
    to.meta.guestOnly &&
    authStore.isAuthenticated &&
    localStorage.getItem("token")
  ) {
    next({ name: ROUTE_NAMES.LOGIN });
  } else {
    next();
  }
});

export default router;
