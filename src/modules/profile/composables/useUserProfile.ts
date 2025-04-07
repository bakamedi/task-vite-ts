import { computed } from "vue";
import { useProfileStore } from "../stores/profile.store";

export const useUserProfile = () => {
  const profileStore = useProfileStore();

  const user = computed(() => profileStore.user);
  const isLoading = computed(() => profileStore.isLoading);
  const showDreawerProfile = computed(() => profileStore.showDreawerProfile);

  return {
    // Métodos
    showProfile: profileStore.showProfile,
    hideProfile: profileStore.hideProfile,
    getProfile: profileStore.getProfile,
    updateProfile: profileStore.updateProfile,
    onChangeUserProfile: profileStore.onChangeUserProfile,
    // Estados
    userProfile: user,
    isLoading,
    showDreawerProfile,
  };
};
