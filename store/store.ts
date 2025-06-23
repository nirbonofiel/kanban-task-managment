import { defineStore } from 'pinia'
import type { Board, Column } from '@/types/boards'
import initialBoards from '@/data/data.json'

export const useStore = defineStore('store', () => {
  const boards = reactive<Board[]>(initialBoards.boards)
  const darkMode = ref(document.documentElement.classList.contains("dark"))
  const activeBoard = ref(initialBoards.boards[0].id)

  const setActiveBoard = (boardId: number) => {
    activeBoard.value = boardId
  }

  const toggleDark = () => {
    darkMode.value = !darkMode.value;
  }

  const createBoard = (board: Omit<Board, "id">) => {
    boards.push({
      ...board,
      id: boards.length + 1
    })
    activeBoard.value = boards.length
  }

  const updateColumns = (columns: Column[]) => {
    const board = boards.find(board => board.id === activeBoard.value)
    if (board) {
      board.columns = columns
      boards.map(board => board.id === activeBoard.value ? board : board)
      console.log(boards);
    }
  }




  return {
    // State
    darkMode,
    activeBoard,
    boards,
    // Actions
    setActiveBoard,
    toggleDark,
    createBoard,
    updateColumns
  }
})