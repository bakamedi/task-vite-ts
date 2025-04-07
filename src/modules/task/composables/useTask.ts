import { computed } from "vue";
import { useTaskStore } from "../stores/task.store";

export const useTask = () => {
  const taskStore = useTaskStore();

  const isModalVisible = computed(() => taskStore.isModalVisible);
  const isDeleteModalVisible = computed(() => taskStore.isDeleteModalVisible);
  const currentTask = computed(() => taskStore.currentTask);
  const tasksResp = computed(() => taskStore.tasksResp);
  const page = computed(() => taskStore.page);
  const limit = computed(() => taskStore.limit);
  const antPagination = computed(() => taskStore.antPagination);
  const confirmLoading = computed(() => taskStore.confirmLoading);
  const isLoadingTable = computed(() => taskStore.isLoadingTable);
  const filteredStatus = computed(() => taskStore.filteredStatus);

  return {
    // Métodos

    openModal: taskStore.openModal,
    closeModal: taskStore.closeModal,
    nextPage: taskStore.nextPage,
    changeLimit: taskStore.changeLimit,
    openDeleteModal: taskStore.openDeleteModal,
    getAll: taskStore.getTasks,
    deleteTask: taskStore.deleteTask,
    createTask: taskStore.createTask,
    updateTask: taskStore.updateTask,
    changeAntPagination: taskStore.changeAntPagination,
    onChangeFilterStatus: taskStore.onChangeFilterStatus,
    onChangeSearchTask: taskStore.onChangeSearchTask,
    // Estados
    page,
    limit,
    antPagination,
    currentTask,
    isModalVisible,
    isDeleteModalVisible,
    tasksResp,
    confirmLoading,
    isLoadingTable,
    filteredStatus,
  };
};
