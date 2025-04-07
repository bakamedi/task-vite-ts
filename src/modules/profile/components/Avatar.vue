<template>
  <div class="avatar-container">
    <a-popover placement="bottomRight">
      <template #content>
        <a-button type="text" block @click="showProfile">Mi perfil</a-button>
        <a-button type="text" block danger @click="handleLogout"
          >Cerrar sesión</a-button
        >
      </template>
      <a-avatar :size="40" style="cursor: pointer">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-popover>
  </div>
  <a-drawer
    :width="500"
    title="Mi Perfil"
    :open="showDreawerProfile"
    placement="bottom"
    @close="hideProfile"
  >
    <template #extra>
      <a-button style="margin-right: 8px" @click="hideProfile"
        >Cancelar</a-button
      >
      <a-button type="primary" @click="handleUpdateProfile" :loading="isLoading"
        >Actualizar Perfil</a-button
      >
    </template>
    <ProfileForm></ProfileForm>
  </a-drawer>
</template>

<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { useAuth } from "../../auth/composables/useAuth";
import { ROUTE_NAMES } from "../../../core/router/route-names";
import router from "../../../core/router";

import ProfileForm from "../../profile/components/ProfileForm.vue";
import { useUserProfile } from "../composables/useUserProfile";
import { useNotification } from "./../../../shared/composables/useNotification";

const { logout } = useAuth();
const {
  showDreawerProfile,
  isLoading,
  showProfile,
  hideProfile,
  updateProfile,
} = useUserProfile();

const { success, error } = useNotification();

const handleUpdateProfile = async () => {
  try {
    const response = await updateProfile();
    if (response) {
      // Handle successful profile update
      console.log("Profile updated successfully:", response);
      success("Perfil actualizado correctamente");
    } else {
      // Handle error case
      console.error("Failed to update profile");
      error("Error al actualizar el perfil");
    }
  } catch (e) {
    console.error("Error updating profile:", e);
    error("Error al actualizar el perfil");
  }
};

const handleLogout = () => {
  logout();
  router.push({ name: ROUTE_NAMES.LOGIN });
};
</script>
