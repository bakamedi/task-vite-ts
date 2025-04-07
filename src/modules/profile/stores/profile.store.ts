import { defineStore } from "pinia";
import type { ProfileState } from "../types/profile.types";
import {
  get as apiGetProfile,
  update as apiUpdateProfile,
} from "../../../api/services/profile.service";
import type { User } from "../../../shared/types/user.types";

export const useProfileStore = defineStore("profile", {
  state: (): ProfileState => ({
    user: null,
    isLoading: false,
    showDreawerProfile: false,
  }),
  actions: {
    showProfile(): void {
      this.showDreawerProfile = true;
    },
    hideProfile(): void {
      this.showDreawerProfile = false;
    },
    async updateProfile(
    ): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true;
        if (!this.user) {
          throw new Error("User data is not available");
        }
        console.log("Updating profile with user data:", this.user);
        const response = await apiUpdateProfile(this.user);
        this.user = response;
        this.isLoading = false;
        this.showDreawerProfile = false;
        return { success: true };
      } catch (error) {
        console.error("Error updating profile:", error);
        this.isLoading = false;
        return {
          success: false,
          error: (error as Error).message || "Profile failed",
        };
      }
    },
    async getProfile(): Promise<void> {
      try {
        this.isLoading = true;
        const response = await apiGetProfile();
        this.user = response;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.isLoading = false;
      }
    },
    onChangeUserProfile(user: User): void {
      this.user = user;
    },
  },
});
