<script setup lang="ts">
import { useStore } from "@/store/store";
import { storeToRefs } from "pinia";
import ColumnSlot from "./ColumnSlot.vue";

const store = useStore();
const { createBoard } = storeToRefs(store);

const boardName = ref("");
const columns = ref([{ id: 1, name: "", tasks: [] }]);
const columnId = ref(1);

const emit = defineEmits<{
  (e: "create-board", board: { name: string; columns: Column[] }): void;
}>();

const handleAddNewColumn = () => {
  if (columns.value.length >= 5) return;
  columnId.value++;
  columns.value.push({ id: columnId.value, name: "", tasks: [] });
};

const handleRemoveColumn = (columnId: number) => {
  if (columns.value.length <= 1) return;
  columns.value = columns.value.filter((col) => col.id !== columnId);
};

const handleSubmit = () => {
  emit("create-board", {
    name: boardName.value.trim(),
    columns: columns.value,
  });

  boardName.value = "";
  columns.value = [{ id: 1, name: "", tasks: [] }];
  columnId.value = 1;

  const dialogTrigger = document.querySelector('[data-state="open"]');
  if (dialogTrigger) {
    (dialogTrigger as HTMLElement).click();
  }
};
</script>

<template>
  <UiDialog id="create-board-dialog">
    <UiDialogTrigger asChild>
      <div
        class="flex items-center gap-2 pl-8 cursor-pointer text-(--color-purple-light) hover:opacity-[.6]"
      >
        <IconsBoardIcon fill="#635FC7" />
        <span class="ml-2 text-base font-medium">+ Create new board</span>
      </div>
    </UiDialogTrigger>
    <UiDialogContent
      class="max-w-[309px] bg-white dark:bg-(--color-sidebar) rounded-md"
    >
      <UiDialogTitle class="text-black dark:text-white"
        >Add New Board</UiDialogTitle
      >
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 py-4">
          <div class="grid grid-rows items-center gap-4">
            <UiLabel
              for="name"
              class="text-right text-(--color-gray-font) dark:text-white"
            >
              Name
            </UiLabel>
            <UiInput
              id="name"
              placeholder="e.g. Web Design"
              class="col-span-3 border-(--color-gray-font) dark:border-(--border-color) dark:text-white"
              v-model="boardName"
              required
            />
          </div>
          <div class="grid grid-rows items-center gap-4">
            <UiLabel
              for="columns"
              class="text-right text-(--color-gray-font) dark:text-white"
            >
              Columns
            </UiLabel>
            <div class="space-y-3">
              <div
                v-for="column in columns"
                :key="column.id"
                class="flex items-center gap-3"
              >
                <UiInput
                  :id="`column-${column.id}`"
                  :placeholder="`e.g. Todo`"
                  class="flex-1 border-(--color-gray-font) dark:border-(--border-color) dark:text-white"
                  v-model="column.name"
                  required
                />
                <button
                  v-if="columns.length > 1"
                  type="button"
                  @click="handleRemoveColumn(column.id)"
                  class="text-(--color-gray-font) hover:text-red-500 transition-colors"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
        <UiDialogFooter class="flex flex-col gap-3">
          <UiButton
            @click="handleAddNewColumn"
            type="button"
            :disabled="columns.length >= 5"
            class="bg-(--color-add-button) dark:bg-white text-(--color-purple-light) w-full rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add New Column
          </UiButton>
          <UiButton
            type="submit"
            class="bg-(--color-purple-light) text-white w-full rounded-3xl"
          >
            Create Board
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
