import { defineStore } from 'pinia'
import type { Board, Column, Task } from '@/types/boards'
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

  const createTask = (task: Omit<Task, 'id'>) => {
    console.log(task);
    const board = boards.find(board => board.id === activeBoard.value)
    if (!board) return

    const targetColumn = board.columns.find(column => column.id === task.statusId)
    if (!targetColumn) return

    // Calculate a unique ID for the task
    const allTasks = board.columns.flatMap(column => column.tasks)
    const maxId = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) : 0
    const newTaskId = maxId + 1

    // Create the complete task object
    const newTask: Task = {
      ...task,
      id: newTaskId,
      status: targetColumn.name
    }

    // Add the task to the target column
    targetColumn.tasks.push(newTask)
    
    console.log('New task created:', newTask)
    console.log('Updated boards:', boards)
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
    updateColumns,
    createTask
  }
})