<script setup lang="ts">
import { useStore } from '@/store/store'

const { activeBoard, boards } = useStore()

const board = computed(() => boards.find((board) => board.id === activeBoard))

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
        <UiButton size="lg" class="rounded-3xl bg-(--color-purple-light)"
          >+ Add new task</UiButton
        >
        <UiButton variant="ghost" class="cursor-pointer"
          ><IconsVerticalEllipsis />
        </UiButton>
      </div>
    </div>
  </div>
</template>
