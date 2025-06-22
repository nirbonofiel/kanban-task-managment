<script setup lang="ts">
const props = defineProps<{
  task: Task;
}>(); 

const completedSubtasks = computed(() => {
  return props.task.subtasks.filter(subtask => subtask.isCompleted).length
})
</script>


<template>
  <UiCard class="bg-white dark:bg-(--color-sidebar) rounded-md mb-6 pt-6 pb-6 pl-4 pr-4 w-full 
  border-(--color-card-border) hover:opacity-[0.45] hover:cursor-grab">
    <UiCardHeader class="p-0">
      <UiCardTitle class="dark:text-white text-base text-black font-bold">{{ task.title }}</UiCardTitle>
      <UiCardDescription class="text-xs font-medium text-(--color-gray-font) ">{{completedSubtasks}} of {{ task.subtasks.length }} subtasks</UiCardDescription>
    </UiCardHeader>
  </UiCard>
</template>
           
