<script setup lang="ts">  
import { useStore } from '@/store/store'

const { boards, activeBoard } = useStore()

const board = computed(() => boards.find((board) => board.id === activeBoard)) 

</script>

<template>
  <div class="h-full flex gap-4 pl-8 pr-8 pt-6 pb-6 bg-(--color-board-bg) overflow-x-auto">
    <Column v-for="column in board?.columns" :key="column.id" :column="column" />
    <div class="h-full flex flex-col min-w-3xs">
      <div class="flex items-center justify-center rounded-md h-full bg-gradient-to-b from-(--color-gray-linear-start) via-(--color-gray-linear-middle) to-(--color-gray-linear-end)">
        <UiButton class="h-full">
          <span class="text-2xl font-bold text-(--color-gray-font) cursor-pointer">+ New Column</span>
        </UiButton>  
      </div>
    </div>
  </div>
</template>