<template>
  <template v-if="isLoading">
    <a-skeleton active />
  </template>
  <template v-else>
    <ImgForm></ImgForm>
    <a-form :model="formState" layout="vertical" class="profile-form">
      <a-row :gutter="[16, 8]">
        <!-- Nombre - Ocupa 24 columnas en móvil, 12 en desktop -->
        <a-col :xs="24" :sm="12">
          <a-form-item
            label="Nombre"
            name="firstName"
            :rules="[
              { required: true, message: 'Por favor ingresa tu nombre' },
            ]"
          >
            <a-input v-model:value="formState.firstName" />
          </a-form-item>
        </a-col>

        <!-- Apellido - Ocupa 24 columnas en móvil, 12 en desktop -->
        <a-col :xs="24" :sm="12">
          <a-form-item
            label="Apellido"
            name="lastName"
            :rules="[
              { required: true, message: 'Por favor ingresa tu apellido' },
            ]"
          >
            <a-input v-model:value="formState.lastName" />
          </a-form-item>
        </a-col>

        <!-- Email - Ocupa 24 columnas siempre -->
        <a-col :span="24">
          <a-form-item label="Email" name="email">
            <a-input
              v-model:value="formState.email"
              :rules="[
                { required: true, message: 'Por favor ingresa tu email' },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { User } from "../../../shared/types/user.types";
import { useUserProfile } from "../composables/useUserProfile";
import ImgForm from "./ImgForm.vue";

const { userProfile, isLoading, getProfile, onChangeUserProfile } =
  useUserProfile();

onMounted(async () => {
  await getProfile();
  formState.value = {
    email: userProfile?.value?.email ?? "",
    firstName: userProfile?.value?.firstName ?? "",
    lastName: userProfile?.value?.lastName ?? "",
    fullName:
      userProfile?.value?.firstName ??
      "" + " " + userProfile?.value?.lastName ??
      "",
  };
  onChangeUserProfile(formState.value);
});

const formState = ref<User>({
  firstName: "",
  lastName: "",
  email: "",
  fullName: "",
});
</script>
