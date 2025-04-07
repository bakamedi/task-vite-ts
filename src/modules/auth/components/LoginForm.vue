<script setup lang="ts">
import { ref } from "vue";
import type { LoginRequest } from "../types/auth.types";
import { useAuth } from "../composables/useAuth";
import router from "../../../core/router";
import { ROUTE_NAMES } from "../../../core/router/route-names";

const { login, isLoading } = useAuth();
const credentials = ref<LoginRequest>({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const { success, error } = await login(credentials.value);

  if (success) {
    router.push({ name: ROUTE_NAMES.HOME });
  } else {
    console.error(error);
  }
};
</script>

<template>
  <a-row type="flex" justify="center" align="middle" class="login-container">
    <a-col :xs="24" :sm="12" :md="8" :lg="6">
      <a-card title="Inicio de sesión" class="login-card">
        <a-form layout="vertical" :model="credentials" @finish="handleSubmit">
          <!-- Email -->
          <a-form-item
            label="Correo electrónico"
            name="email"
            :rules="[
              {
                required: true,
                type: 'email',
                message: 'Ingrese un email válido',
              },
            ]"
          >
            <a-input
              v-model:value="credentials.email"
              placeholder="ejemplo@dominio.com"
              size="large"
            >
              <template #prefix>
                <mail-outlined />
              </template>
            </a-input>
          </a-form-item>

          <!-- Contraseña -->
          <a-form-item
            label="Contraseña"
            name="password"
            :rules="[{ required: true, message: 'Campo obligatorio' }]"
          >
            <a-input-password
              v-model:value="credentials.password"
              placeholder="••••••••"
              size="large"
            >
              <template #prefix>
                <lock-outlined />
              </template>
            </a-input-password>
          </a-form-item>

          <!-- Botón -->
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              :loading="isLoading"
              block
            >
              Ingresar
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>
