import { defineStore } from 'pinia'
import type { Board } from '@/types/boards'
import initialBoards from '@/data/data.json'

export const useStore = defineStore('store', () => {
  const boards = reactive<Board[]>(initialBoards.boards)
  const darkMode = ref(false)
  const activeBoard = ref(initialBoards.boards[0].id)

  return {
    darkMode,
    activeBoard,
    boards,
  }
})