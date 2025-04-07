<script setup lang="ts">
import TaskView from "../../modules/task/components/TaskView.vue";
import Header from "../../shared/components/Header.vue";
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <Header></Header>
      <a-layout>
        <a-layout-content>
          <TaskView></TaskView>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-space>
</template>
