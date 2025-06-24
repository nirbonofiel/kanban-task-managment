<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
const props = defineProps<{
  task: Task;
}>();

const taskDetails = ref<Task>({
  ...props.task,
})

const completedSubtasks = computed(() => {
  return taskDetails.value.subtasks.filter(subtask => subtask.isCompleted).length
})

const store = useStore()
const { updateTask, updateSubtask } = store
const { boards, activeBoard } = storeToRefs(store)

const setSubtask = (subtask: Subtask) => {
  const updatedSubtasks = taskDetails.value.subtasks.map(sbt => {
    if (sbt.title === subtask.title) {
      return {
        ...sbt,
        isCompleted: !sbt.isCompleted
      }
    }
    return sbt
  })
  taskDetails.value.subtasks = updatedSubtasks
  updateSubtask(taskDetails.value)

}

const setStatus = (statusId: number) => {
  taskDetails.value.statusId = statusId
  taskDetails.value.status = board?.value?.columns.find(column => column.id === statusId)?.name || ''
  updateTask(taskDetails.value)
}

const board = computed(() => boards.value.find((board) => board.id === activeBoard.value)) 
</script>

<template>
  <UiDialog>
    <UiDialogTrigger asChild>
      <Task :task="taskDetails" />
    </UiDialogTrigger>
    <UiDialogContent
      class="max-w-[309px] bg-white dark:bg-(--color-sidebar) rounded-md"
    >
      <UiDialogTitle class="font-bold text-black dark:text-white">{{taskDetails.title}}</UiDialogTitle>
      <UiDialogDescription class="text-xs text-(--color-gray-font)">{{
        taskDetails.description ? taskDetails.description : "No description"
      }}</UiDialogDescription>
      <div class="flex flex-col gap-2 text-xs text-black dark:text-white">{{completedSubtasks}} of {{ taskDetails.subtasks.length }} subtasks</div>
      <div class="flex bg-(--color-board-bg) p-2 rounded-md gap-2" v-for="subtask in taskDetails.subtasks" :key="subtask.id">
        <UiCheckbox id="subtasks" class="text-xs text-black dark:text-white" @update:model-value="setSubtask(subtask)" :model-value="subtask.isCompleted"/>
        <UiLabel for="subtasks" class="text-xs text-black dark:text-white"
        :class="{'line-through': subtask.isCompleted}">{{subtask.title}}</UiLabel>
      </div>
      <div class="flex flex-col gap-2 text-xs text-black dark:text-white">
        <UiLabel for="status" class="text-xs text-black dark:text-white">Current Status</UiLabel>
        <UiSelect>
              <UiSelectTrigger
                class="bg-white dark:bg-(--color-sidebar) dark:text-white w-full"
              >
                <UiSelectValue :placeholder="taskDetails.status"/>
              </UiSelectTrigger>
              <UiSelectContent
                class="bg-white dark:bg-(--color-sidebar) dark:text-white w-full"
              >
                <UiSelectItem
                  v-model="taskDetails.statusId"
                  v-for="status in board?.columns"
                  :key="status.id"
                  :value="status.id"
                  @select="setStatus(status.id)"
                  required
                >
                  {{ status.name }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
