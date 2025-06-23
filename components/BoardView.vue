<script setup lang="ts">  
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { updateColumns } = store
const { boards, activeBoard } = storeToRefs(store)

const board = computed(() => boards.value.find((board) => board.id === activeBoard.value)) 

</script>

<template>
  <div class="h-full flex gap-4 pl-8 pr-8 pt-6 pb-6 bg-(--color-board-bg) overflow-auto">
    <Column v-for="column in board?.columns" :key="column.id" :column="column" />
    <div class="h-[80vh] flex flex-col min-w-3xs mt-8">
      <div class="flex items-center justify-center rounded-md h-full bg-gradient-to-b from-(--color-gray-linear-start) via-(--color-gray-linear-middle) to-(--color-gray-linear-end)">
        <CreateColumn @create-column="updateColumns" />
      </div>
    </div>
  </div>
</template>