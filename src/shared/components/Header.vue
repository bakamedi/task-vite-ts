<template>
  <div class="header-container">
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
      style="flex: 1; line-height: 64px; border-bottom: none"
    />

    <Avatar></Avatar>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import Avatar from "../../modules/profile/components/Avatar.vue";

const current = ref<string[]>(["tasks"]);

const items = ref<MenuProps["items"]>([
  {
    key: "tasks",
    icon: () => h(AppstoreOutlined),
    label: "Tareas",
    title: "Tareas",
  },
]);
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 64px;
}

/* Estilos para el menú */
:deep(.ant-menu-horizontal) {
  border-bottom: none !important;
}

:deep(.ant-menu-item) {
  padding: 0 20px;
  font-weight: 500;
}
</style>
