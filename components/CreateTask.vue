<script setup lang="ts">
defineProps<{
  board: Board;
}>();

const task = ref<Omit<Task, 'id' >>({
  title: "",
  description: "",
  subtasks: [{ id: 0, title: "", isCompleted: false }],
  status: "",
  statusId: 0,
});

const emit = defineEmits<{
  (e: "create-task", task: Omit<Task, 'id'>): void;
}>();

const handleAddNewSubtask = () => {
  task.value.subtasks.push({ id: task.value.subtasks.length + 1, title: "", isCompleted: false });
};

const handleRemoveSubtask = (subtaskTitle: string) => {
  task.value.subtasks = task.value.subtasks.filter((subtask) => subtask.title !== subtaskTitle);
};

const setStatus = (statusId: number) => {
  task.value.statusId = statusId;
};

const handleSubmit = () => {
  emit("create-task", task.value);

  task.value = {
    title: "",
    description: "",
    subtasks: [{ title: "", isCompleted: false }],
    status: "",
    statusId: 0,
  };

  const dialogTrigger = document.querySelector('[data-state="open"]');
  if (dialogTrigger) {
    (dialogTrigger as HTMLElement).click();
  }
};
</script>

<template>
  <UiDialog>
    <UiDialogTrigger>
      <UiButton
        size="lg"
        class="rounded-3xl bg-(--color-purple-light) cursor-pointer"
        >+ Add new task</UiButton
      >
    </UiDialogTrigger>
    <UiDialogContent
      class="max-w-[309px] bg-white dark:bg-(--color-sidebar) rounded-md"
    >
      <UiDialogTitle class="text-black dark:text-white"
        >Add New Task</UiDialogTitle
      >
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 py-4">
          <div class="grid grid-rows items-center gap-4">
            <UiLabel
              for="name"
              class="text-right text-(--color-gray-font) dark:text-white"
            >
              Title
            </UiLabel>
            <UiInput
              id="title"
              class="col-span-3 border-(--color-gray-font) dark:border-(--border-color) dark:text-white"
              v-model="task.title"
              required
            />
          </div>
          <div class="grid grid-rows items-center gap-4">
            <UiLabel
              for="name"
              class="text-right text-(--color-gray-font) dark:text-white"
            >
              Description
            </UiLabel>
            <UiTextarea
              id="description"
              class="col-span-3 border-(--color-gray-font) dark:border-(--border-color) dark:text-white"
              v-model="task.description"
            />
          </div>
          <div class="grid grid-rows items-center gap-4">
            <UiLabel
              for="subtasks"
              class="text-right text-(--color-gray-font) dark:text-white"
            >
              Subtasks
            </UiLabel>
            <div class="space-y-3">
              <div
                v-for="(subtask, index) in task.subtasks"
                :key="index"
                class="flex items-center gap-3"
              >
                <UiInput
                  :id="`subTask-${subtask.title}`"
                  class="flex-1 border-(--color-gray-font) dark:border-(--border-color) dark:text-white"
                  v-model="subtask.title"
                  required
                />
                <button
                  v-if="task.subtasks.length > 0"
                  type="button"
                  @click="handleRemoveSubtask(subtask.title)"
                  class="text-(--color-gray-font) hover:text-red-500 transition-colors"
                >
                  X
                </button>
              </div>
            </div>
            <UiButton
              @click="handleAddNewSubtask"
              type="button"
              :disabled="task.subtasks.length >= 7"
              class="bg-(--color-add-button) dark:bg-white text-(--color-purple-light) w-full rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add New Subtask
            </UiButton>
          </div>
          <div class="grid grid-rows items-center gap-4">
            <UiLabel
              for="columns"
              class="text-right text-(--color-gray-font) dark:text-white"
            >
              Status
            </UiLabel>
            <UiSelect required>
              <UiSelectTrigger
                class="bg-white dark:bg-(--color-sidebar) dark:text-white w-full"
              >
                <UiSelectValue placeholder="Select a status" />
              </UiSelectTrigger>
              <UiSelectContent
                class="bg-white dark:bg-(--color-sidebar) dark:text-white w-full"
              >
                <UiSelectItem
                  v-for="status in board?.columns"
                  :key="status.id"
                  :value="status.id"
                  @select="setStatus(status.id)"   
                >
                  {{ status.name }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>
        <UiDialogFooter>
          <UiButton
            type="submit"
            class="bg-(--color-purple-light) text-white w-full rounded-3xl"
            >Create Task</UiButton
          >
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
