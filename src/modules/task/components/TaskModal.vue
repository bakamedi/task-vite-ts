<template>
  <a-modal
    v-model:open="isModalVisible"
    :title="currentTask ? 'Editar Tarea' : 'Nueva Tarea'"
    width="600px"
    @cancel="closeModal"
  >
    <template #footer>
      <a-button key="back" @click="closeModal">Cancelar</a-button>
      <a-button
        key="submit"
        type="primary"
        :confirm-loading="confirmLoading"
        @click="handleSubmit"
        >Guardar</a-button
      >
    </template>
    <a-form layout="vertical" :model="formState">
      <!-- Título -->
      <a-form-item
        label="Título"
        name="title"
        :rules="[{ required: true, message: 'Campo obligatorio' }]"
      >
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <!-- Estado de completado -->
      <a-form-item label="Completado" name="completed">
        <a-switch v-model:checked="formState.completed" />
      </a-form-item>

      <!-- Descripción -->
      <a-form-item label="Descripción" name="description">
        <a-textarea v-model:value="formState.description" :rows="4" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Task } from "../types/task.types";
import { useTask } from "../composables/useTask";
import { useNotification } from "./../../../shared/composables/useNotification";

const { success } = useNotification();

const {
  isModalVisible,
  currentTask,
  confirmLoading,
  closeModal,
  createTask,
  updateTask,
} = useTask();

const formState = ref<Task>({
  id: "",
  title: "",
  description: "",
  completed: false,
});

const handleSubmit = async () => {
  if (currentTask.value?.id !== undefined && currentTask.value?.id !== "") {
    await updateTask(formState.value);
    success("Tarea actualizada correctamente");
  } else {
    await createTask(formState.value);
    success("Tarea creada correctamente");
  }
};

// Sincronizar con la tarea actual al abrir el modal
watch(
  () => currentTask,
  (task) => {
    if (task) {
      formState.value = {
        id: task.value?.id || "",
        title: task.value?.title || "",
        description: task.value?.description || "",
        completed: task.value?.completed || false,
      };
    } else {
      formState.value = {
        title: "",
        description: "",
        completed: false,
      };
    }
  },
  { deep: true }
);
</script>
