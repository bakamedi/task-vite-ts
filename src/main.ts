import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./core/router";
import Antd from "ant-design-vue";
import notificationPlugin from "./shared/plugins/notification";
import authenticadedPlugin from "./shared/plugins/authenticated";


createApp(App)
  .use(notificationPlugin)
  .use(authenticadedPlugin)
  .use(Antd)
  .use(router)
  .use(createPinia())
  .mount("#app");
