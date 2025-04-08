<template>
  <a-tabs v-model:activeKey="activeKey" type="card" centered>
    <a-tab-pane key="1" tab="Ingreso">
      <LoginForm></LoginForm>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Registro">
      <RegisterForm></RegisterForm>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
const activeKey = ref("1");
</script>
