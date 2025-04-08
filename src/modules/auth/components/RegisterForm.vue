<script setup lang="ts">
import { ref } from "vue";
import type { RegisterRequest } from "../types/auth.types";
import { useAuth } from "../composables/useAuth";
import router from "../../../core/router";
import { ROUTE_NAMES } from "../../../core/router/route-names";
import { useNotification } from "../../../shared/composables/useNotification";

const { register, isLoading } = useAuth();

const { success, error } = useNotification();


const credentials = ref<RegisterRequest>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  const { done, failure } = await register(credentials.value);

  if (done) {
    success("Usuario registrado correctamente");
    router.push({ name: ROUTE_NAMES.HOME });
  } else {
    error(failure || "Error al registrar el usuario");
    console.error(error);
  }
};
</script>

<template>
  <a-row type="flex" justify="center" align="middle" class="login-container">
    <a-col :xs="24" :sm="12" :md="8" :lg="6">
      <a-card title="Registro de Usuario" class="login-card">
        <a-form layout="vertical" :model="credentials" @finish="">
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
            </a-input>
          </a-form-item>

          <!-- Nombre -->
          <a-form-item
            label="Nombre"
            name="firstName"
            :rules="[
              {
                required: true,
                type: 'string',
                message: 'Campo obligatorio',
              },
            ]"
          >
            <a-input
              v-model:value="credentials.firstName"
              placeholder="Ingres su nombre"
              size="large"
            >
            </a-input>
          </a-form-item>

          <!-- Apellido -->
          <a-form-item
            label="Apellido"
            name="lastName"
            :rules="[
              {
                required: true,
                type: 'string',
                message: 'Campo obligatorio',
              },
            ]"
          >
            <a-input
              v-model:value="credentials.lastName"
              placeholder="Ingres su apellido"
              size="large"
            >
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
            </a-input-password>
          </a-form-item>

          <!-- Confirmar Contraseña -->
          <a-form-item
            label="Confirmar Contraseña"
            name="password"
            :rules="[{ required: true, message: 'Campo obligatorio' }]"
          >
            <a-input-password
              v-model:value="credentials.confirmPassword"
              placeholder="••••••••"
              size="large"
            >
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
              @click="handleSubmit"
            >
              Registrar
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>
