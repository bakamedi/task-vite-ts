import type { User, UserResponse } from "../../shared/types/user.types";
import { apiClient } from "../adapters/axios.adapter";

const apiName = "/users/";

export const get = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get<UserResponse>(`${apiName}profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const update = async (user: User): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.put<UserResponse>(apiName, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};