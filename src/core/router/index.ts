import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./router";
import { ROUTE_NAMES } from "./route-names";
import { useAuthenticaded } from "../../shared/composables/useAuthenticaded";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guardia global de navegación
router.beforeEach((to, _, next) => {
  const { isAuthenticated } = useAuthenticaded();

  // Ruta solo para invitados (ej: login/register)
  // Ruta protegida
  if (
    to.meta.requiresAuth &&
    !isAuthenticated &&
    !localStorage.getItem("token")
  ) {
    next({ name: ROUTE_NAMES.LOGIN });
  } else if (
    to.meta.guestOnly &&
    isAuthenticated &&
    localStorage.getItem("token")
  ) {
    // Si está autenticado, redirigir al home
    next({ name: ROUTE_NAMES.HOME });
  } else {
    next();
  }
});

export default router;
