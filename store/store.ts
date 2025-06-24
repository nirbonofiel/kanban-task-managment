import { defineStore } from 'pinia'
import type { Board, Column, Subtask, Task } from '@/types/boards'
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

  const updateTask = (task: Task) => {
    const board = boards.find(board => board.id === activeBoard.value)
    if (!board) return

    // Find the current column containing the task
    const currentColumn = board.columns.find(column => 
      column.tasks.some(t => t.id === task.id)
    )
    if (!currentColumn) return

    // Find the target column based on the new statusId
    const targetColumn = board.columns.find(column => column.id === task.statusId)
    if (!targetColumn) return

    // Remove the task from the current column
    const currentTaskIndex = currentColumn.tasks.findIndex(t => t.id === task.id)
    if (currentTaskIndex !== -1) {
      currentColumn.tasks.splice(currentTaskIndex, 1)
    }

    // Add the task to the target column
    targetColumn.tasks.push(task)
  }

  const updateSubtask = (task: Task) => {
    const board = boards.find(board => board.id === activeBoard.value)
    if (!board) return

    // Find the current column containing the task
    const currentColumn = board.columns.find(column => 
      column.tasks.some(t => t.id === task.id)
    )
    if (!currentColumn) return

    // Find the task in the current column
    const currentTaskIndex = currentColumn.tasks.findIndex(t => t.id === task.id)
    if (currentTaskIndex === -1) return

    currentColumn.tasks[currentTaskIndex] = task
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
    createTask,
    updateTask,
    updateSubtask
  }
})