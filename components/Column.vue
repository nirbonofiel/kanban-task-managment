<script setup lang="ts">
import { columnColors } from "@/types/colors";

defineProps<{
  column: Column;
}>();
</script>

<template>
  <div class="min-w-3xs h-full">
    <div
      class="flex items-center tracking-widest mb-4 uppercase font-bold text-(--color-gray-font) text-xs"
    >
      <span
        class="w-3 h-3 mr-2 rounded-full"
        :style="{ backgroundColor: columnColors[column.id].hex }"
      ></span>
      <span>{{ column.name }} ({{ column.tasks.length }})</span>
    </div>
    <div class="flex flex-col gap-2">
      <Task
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

