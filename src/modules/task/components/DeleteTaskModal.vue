<template>
  <a-modal
    v-model:open="isDeleteModalVisible"
    title="¿Estás seguro de eliminar esta tarea?"
    width="600px"
    @cancel="closeModal"
  >
    <template #footer>
      <a-button key="back" @click="closeModal">Cancelar</a-button>
      <a-button
        key="Sí, eliminar"
        type="primary"
        danger
        @click="handleDeleteTask"
        >Sí, eliminar</a-button
      >
    </template>
    <p>Al eliminar la tarea será permentemente.</p>
  </a-modal>
</template>
<script lang="ts" setup>
import { useTask } from "../composables/useTask";
import { useNotification } from "./../../../shared/composables/useNotification";

const { isDeleteModalVisible, currentTask, closeModal, deleteTask } = useTask();
const { success, error } = useNotification();

const handleDeleteTask = async () => {
  if (currentTask.value) {
    if (currentTask.value.id) {
      await deleteTask(currentTask.value.id);
      closeModal();
      success("Tarea eliminada correctamente");
      return;
    }
    closeModal();
  }
};
</script>
