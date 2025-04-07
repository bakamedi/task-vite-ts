<script setup lang="ts">
import TaskModal from "../../../modules/task/components/TaskModal.vue";
import DeleteTaskModal from "../../../modules/task/components/DeleteTaskModal.vue";
import TaskTable from "../../../modules/task/components/TaskTable.vue";
</script>

<template>
  <DeleteTaskModal></DeleteTaskModal>
  <TaskModal></TaskModal>
  <TaskTable></TaskTable>
</template>
