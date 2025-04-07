import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./core/router";
import Antd from "ant-design-vue";
import notificationPlugin from "./shared/plugins/notification";

createApp(App)
  .use(notificationPlugin)
  .use(Antd)
  .use(router)
  .use(createPinia())
  .mount("#app");
