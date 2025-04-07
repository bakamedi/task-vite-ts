import type { RouteRecordRaw } from "vue-router";
import { ROUTE_NAMES } from "./route-names";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAMES.HOME,
    component: () => import("../../shared/components/HomeView.vue"),
    meta: { requiresAuth: true }, // Meta campo para protección
  },
  {
    path: "/login",
    name: ROUTE_NAMES.LOGIN,
    component: () => import("./../../modules/auth/components/LoginForm.vue"),
    meta: { guestOnly: true },
  },
];
