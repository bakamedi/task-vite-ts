import { defineStore } from "pinia";
import {
  InitialAntPagination,
  EmptyTasksResponse,
  type Task,
  type TaskState,
  type PaginationParams,
} from "../types/task.types";
import {
  getAll as apiGetAllTask,
  deleteById as apiDeleteById,
  create as apiCreate,
  update as apiUpdate,
} from "./../../../api/services/task.service";

export const useTaskStore = defineStore("task", {
  state: (): TaskState => ({
    currentTask: null,
    isModalVisible: false,
    isLoadingTable: false,
    isDeleteModalVisible: false,
    confirmLoading: false,
    tasksResp: EmptyTasksResponse,
    page: 1,
    limit: 10,
    antPagination: InitialAntPagination,
    filteredStatus: null,
  }),
  actions: {
    openDeleteModal(task: Task): void {
      this.currentTask = task;
      this.isDeleteModalVisible = true;
    },
    openModal(task?: Task): void {
      this.currentTask = task || null;
      this.isModalVisible = true;
    },
    closeModal(): void {
      this.isModalVisible = false;
      this.currentTask = null;
      this.isDeleteModalVisible = false;
    },
    async getTasks(params: PaginationParams): Promise<void> {
      try {
        this.isLoadingTable = true;

        this.tasksResp = await apiGetAllTask(params);
        this.changeAntPagination(
          this.tasksResp.pagination.currentPage,
          this.tasksResp.pagination.pageSize,
          this.tasksResp.pagination.totalItems
        );
        this.isLoadingTable = false;
      } catch (error) {
        this.isLoadingTable = false;
        this.tasksResp = { ...EmptyTasksResponse };
        throw error;
      }
    },
    async createTask(task: Task): Promise<void> {
      this.confirmLoading = true;
      const newTask = await apiCreate(task);
      this.tasksResp.data = [newTask, ...this.tasksResp.data];
      const updatedTotalItems = this.tasksResp.pagination.totalItems + 1;
      const updatedTotalPages = Math.ceil(
        updatedTotalItems / this.tasksResp.pagination.pageSize
      );

      this.tasksResp.pagination = {
        ...this.tasksResp.pagination,
        totalItems: updatedTotalItems,
        totalPages: updatedTotalPages,
        hasNextPage: this.tasksResp.pagination.currentPage < updatedTotalPages,
        hasPreviousPage: this.tasksResp.pagination.currentPage > 1,
      };

      if (this.tasksResp.data.length > this.limit) {
        await this.getTasks({
          page: this.page,
          limit: this.limit,
          completed: undefined,
        });
      }

      this.changeAntPagination(
        this.tasksResp.pagination.currentPage,
        this.tasksResp.pagination.pageSize,
        updatedTotalItems
      );

      this.isModalVisible = false;
    },
    async updateTask(task: Task): Promise<void> {
      this.confirmLoading = true;
      const updatedTask = await apiUpdate(task);
      const taskIndex = this.tasksResp.data.findIndex(
        (t) => t.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        this.tasksResp.data[taskIndex] = updatedTask;
      }
      const updatedTotalItems = this.tasksResp.pagination.totalItems;
      const updatedTotalPages = Math.ceil(
        updatedTotalItems / this.tasksResp.pagination.pageSize
      );
      this.tasksResp.pagination = {
        ...this.tasksResp.pagination,
        totalItems: updatedTotalItems,
        totalPages: updatedTotalPages,
        hasNextPage: this.tasksResp.pagination.currentPage < updatedTotalPages,
        hasPreviousPage: this.tasksResp.pagination.currentPage > 1,
      };
      this.changeAntPagination(
        this.tasksResp.pagination.currentPage,
        this.tasksResp.pagination.pageSize,
        updatedTotalItems
      );
      this.confirmLoading = false;
      this.isModalVisible = false;
    },
    async deleteTask(taskId: string): Promise<void> {
      const response = await apiDeleteById(taskId);
      if (!response) {
        return Promise.resolve();
      }
      this.tasksResp.data = this.tasksResp.data.filter(
        (task) => task.id !== taskId
      );

      const updatedTotalItems = this.tasksResp.pagination.totalItems - 1;
      const updatedTotalPages = Math.ceil(
        updatedTotalItems / this.tasksResp.pagination.pageSize
      );

      this.tasksResp.pagination = {
        ...this.tasksResp.pagination,
        totalItems: updatedTotalItems,
        totalPages: updatedTotalPages,
        hasNextPage: this.tasksResp.pagination.currentPage < updatedTotalPages,
        hasPreviousPage: this.tasksResp.pagination.currentPage > 1,
      };

      // 3. Actualizar la paginación de Ant Design
      this.changeAntPagination(
        this.tasksResp.pagination.currentPage,
        this.tasksResp.pagination.pageSize,
        updatedTotalItems
      );
    },
    nextPage(page: number): void {
      this.page = page;
    },
    changeLimit(limit: number): void {
      this.limit = limit;
    },
    changeAntPagination(
      current?: number,
      pageSize?: number,
      total?: number
    ): void {
      this.antPagination = {
        current: current ?? this.tasksResp.pagination.currentPage,
        pageSize: pageSize ?? this.tasksResp.pagination.pageSize,
        total: total ?? this.tasksResp.pagination.totalItems,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total: number) => `Total ${total} tareas`,
      };
    },
    onChangeFilterStatus(status: {} | null): void {
      this.filteredStatus = status;
    },
    async onChangeSearchTask(search: string): Promise<void> {
      const params: PaginationParams = {
        page: this.page ?? 1,
        limit: this.limit ?? 10,
        ...(search && { search: search.trim() }), // Solo añade search si hay término
      };
  
      await this.getTasks(params);
    },
  },
});
