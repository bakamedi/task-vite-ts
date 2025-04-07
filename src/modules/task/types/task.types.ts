export interface Task {
  id?: string | null;
  title: string | null;
  description: string | null;
  completed: boolean | null;
}

export interface TaskState {
  currentTask?: Task | null;
  isModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isLoadingTable: boolean;
  filteredStatus?: {} | null;
  confirmLoading: boolean;
  page: number;
  limit: number;
  tasksResp: TasksResponse;
  antPagination: AntPagination;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
  // sortBy?: string
  // sortOrder?: 'asc' | 'desc'
  [key: string]: any; // Para filtros adicionales
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TasksResponse {
  data: Task[];
  pagination: Pagination;
}

export interface TaskResponse {
  data: Task;
}

export const EmptyTasksResponse: TasksResponse = {
  data: [],
  pagination: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

export interface AntPagination {
  total?: number;
  current?: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  showTotal?: (total: number, range: [number, number]) => string;
}

export const InitialAntPagination: AntPagination = {
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "50"],
  showTotal: (total: number) => `Total ${total} tareas`,
};
