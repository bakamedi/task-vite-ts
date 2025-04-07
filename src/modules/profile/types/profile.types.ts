import type { User } from "../../../shared/types/user.types";

export interface ProfileState {
  user: User | null;
  isLoading: boolean;
  showDreawerProfile: boolean;
}
