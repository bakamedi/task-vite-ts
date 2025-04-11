import { useAuthenticaded } from "../composables/useAuthenticaded";

export default {
  install: (app: any) => {
    const authenticaded = useAuthenticaded();
    app.config.globalProperties.$authenticaded = authenticaded;
    app.provide("authenticaded", authenticaded);
  },
};
