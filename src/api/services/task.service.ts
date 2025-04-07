import type {
  PaginationParams,
  Task,
  TaskResponse,
  TasksResponse,
} from "../../modules/task/types/task.types";
import { apiClient } from "../adapters/axios.adapter";

const apiName = "/tasks/";

export const getAll = async (
  params: PaginationParams & { [key: string]: any }
): Promise<TasksResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get<TasksResponse>(apiName, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const deleteById = async (taskId: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.delete(`${apiName}${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Task deleted successfully:", response.data);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const create = async (task: Task): Promise<Task> => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.post<TaskResponse>(apiName, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const update = async (task: Task): Promise<Task> => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.put<TaskResponse>(`${apiName}${task.id}`, task, {
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
