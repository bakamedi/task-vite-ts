import { useNotification } from "../composables/useNotification";

export default {
  install: (app: any) => {
    const notification = useNotification();
    app.config.globalProperties.$notification = notification;
    app.provide("notification", notification);
  },
};
