<script setup lang="ts">
defineProps<{
  task: Task;
}>();           
</script>


<template>
  <UiCard class="bg-white dark:bg-(--color-sidebar) rounded-md mb-6 pt-6 pb-6 pl-4 pr-4 w-full border-(--color-card-border)">
    <UiCardHeader class="p-0">
      <UiCardTitle class="dark:text-white text-base text-black font-bold">{{ task.title }}</UiCardTitle>
      <UiCardDescription class="text-xs font-medium text-(--color-gray-font) ">1 of {{ task.subtasks.length }} subtasks</UiCardDescription>
    </UiCardHeader>
  </UiCard>
</template>
           
