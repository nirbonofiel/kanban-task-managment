<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { createTask } = store
const { activeBoard, boards } = storeToRefs(store)

const board = computed(() => boards.value.find((board) => board.id === activeBoard.value))

</script>

<template>
  <div
    class="flex items-center justify-between py-4 border-b border-border border-(--color-border) dark:border-(--color-border)"
  >
    <Logo class="pl-6" />
    <div class="w-full flex items-center justify-between pl-8 pr-8">
      <h1 class="text-black dark:text-white text-2xl font-bold pl-13">
        {{ board?.name }}
      </h1>
      <div class="flex items-center gap-4">
        <CreateTask :board="board" @create-task="createTask" />
        <span>
          <IconsVerticalEllipsis />
        </span>
        <!-- <UiButton variant="ghost" class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2"
          ><IconsVerticalEllipsis />
        </UiButton> -->
      </div>
    </div>
  </div>
</template>
