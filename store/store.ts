import { defineStore } from 'pinia'
import type { Board } from '@/types/boards'
import initialBoards from '@/data/data.json'

export const useStore = defineStore('store', () => {
  const boards = reactive<Board[]>(initialBoards.boards)
  const darkMode = ref(document.documentElement.classList.contains("dark"))
  const activeBoard = ref(initialBoards.boards[0].id)

  const setActiveBoard = (boardId: number) => {
    activeBoard.value = boardId
  }

  function toggleDark() {
    darkMode.value = !darkMode.value;
  }

  return {
    darkMode,
    activeBoard,
    boards,
    setActiveBoard,
    toggleDark,
  }
})