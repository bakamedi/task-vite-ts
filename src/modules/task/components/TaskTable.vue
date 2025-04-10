<script setup lang="ts">
import { useTask } from "../composables/useTask";

import { onMounted, ref } from "vue";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons-vue";
import type { PaginationParams, Task } from "../types/task.types";

const {
  openModal: openTaskModal,
  openDeleteModal,
  getAll,
  nextPage,
  changeAntPagination,
  onChangeFilterStatus,
  onChangeSearchTask,

  isLoadingTable,
  tasksResp,
  antPagination,
  filteredStatus,
} = useTask();

// Variables reactivas
const searchTitleTask = ref<string>("");
// Columnas de la tabla

const columns = ref([
  {
    title: "Título",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Estado",
    dataIndex: "completed",
    key: "completed",
    filters: [
      { text: "Completadas", value: true },
      { text: "Pendientes", value: false },
    ],
    width: "20%",
    filteredValue: filteredStatus || undefined || null,
  },
  {
    title: "Acciones",
    key: "actions",
    width: "100",
    fixed: 'right',
  },
]);

// Cargar datos iniciales
onMounted(async (params: PaginationParams) => {
  await getAll(params);
});

const handleEdit = (task: Task) => {
  openTaskModal(task);
};

const handleSearch = (value: string) => {
  searchTitleTask.value = value;
  onChangeSearchTask(value);
};

//Manejar cambios de paginación/filtros/orden
const handleTableChange = async (
  pag: {
    current?: number;
    pageSize?: number;
  },
  filters: {
    completed: boolean[];
  }
) => {
  onChangeFilterStatus(filters.completed);
  // if (pag.current == page.value) {
  //   return;
  // }
  nextPage(pag.current ?? 1);
  changeAntPagination(pag.current);
  if (filteredStatus.value === null) {
    pag.current = 1;
    pag.pageSize = 10;
    await getAll({
      page: pag.current ?? 1,
      limit: pag.pageSize ?? 10,
    });
    return;
  }
  if (filters.completed.length === 1) {
    pag.current = 1;
    pag.pageSize = 10;
    const completed = filters.completed[0];
    await getAll({
      page: pag.current ?? 1,
      limit: pag.pageSize ?? 10,
      completed: completed,
    });
    return;
  } else {
    pag.current = 1;
    pag.pageSize = 10;
    onChangeFilterStatus(null);

    await getAll({
      page: pag.current ?? 1,
      limit: pag.pageSize ?? 10,
    });
    return;
  }
};
</script>
<template>
  <div class="task-table-container">
    <a-table
      :columns="columns"
      :data-source="tasksResp.data"
      :pagination="antPagination"
      :loading="isLoadingTable"
      :scroll="{ x: 1500 }"
      bordered
      @change="handleTableChange"
    >
      <!-- Título personalizado -->
      <template #title>
        <div class="table-header">
          <h3>Listado de Tareas</h3>
          <a-button type="primary" @click="openTaskModal">
            <template #icon><plus-outlined /></template>
            Nueva Tarea
          </a-button>
        </div>
        <a-divider />

        <a-row>
          <a-col :span="12" :offset="12">
            <a-input-search
              v-model:value="searchTitleTask"
              placeholder="Buscar tarea por título..."
              :loading="isLoadingTable"
              enter-button
              @search="handleSearch"
            />
          </a-col>
        </a-row>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'completed'">
          <span>
            <a-tag :color="record.completed ? 'green' : 'geekblue'">
              {{ record.completed ? "Completada" : "Pendiente" }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'actions'">
          <a-flex justify="space-around" gap="small">
            <a-button size="small" @click="handleEdit(record)">
              <template #icon><EditFilled /></template>
              Editar
            </a-button>
            <a-button danger size="small" @click="openDeleteModal(record)">
              <template #icon><DeleteFilled /></template>
              Eliminar
            </a-button>
          </a-flex>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.task-table-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa !important;
  font-weight: 600;
}
</style>
