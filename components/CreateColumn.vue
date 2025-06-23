<script setup lang="ts">
import { useStore } from "@/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { boards, activeBoard } = storeToRefs(store);

const board = computed(() =>
  boards.value.find((board) => board.id === activeBoard.value)
);

const emit = defineEmits<{
  (e: "create-column", columns: Column[]): void;
}>();

const columns = ref(board.value?.columns || [{ id: 1, name: "", tasks: [] }]);

const columnId = ref(board.value?.columns.length || 1);

watch(
  board,
  (newBoard) => {
    if (newBoard && newBoard.columns.length > 0) {
      columns.value = newBoard.columns.map((col) => ({ ...col }));
      columnId.value = Math.max(...newBoard.columns.map((col) => col.id)) + 1;
    } else {
      columns.value = [{ id: 1, name: "", tasks: [] }];
      columnId.value = 1;
    }
  },
  { immediate: true }
);

const handleAddNewColumn = () => {
  columnId.value++;
  columns.value.push({ id: columnId.value, name: "", tasks: [] });
};

const handleRemoveColumn = (columnId: number) => {
  columns.value = columns.value.filter((col) => col.id !== columnId);
};

const handleSubmit = () => {
  emit("create-column", columns.value);

  columns.value = board.value?.columns || [{ id: 1, name: "", tasks: [] }];
  columnId.value = board.value?.columns.length || 1;

  const dialogTrigger = document.querySelector('[data-state="open"]');
  if (dialogTrigger) {
    (dialogTrigger as HTMLElement).click();
  }
};
</script>

<template>
  <UiDialog id="create-column-dialog">
    <UiDialogTrigger asChild>
      <div class="h-full flex items-center justify-center">
        <span class="text-2xl font-bold text-(--color-gray-font) cursor-pointer"
          >+ New Column</span
        >
      </div>
    </UiDialogTrigger>
    <UiDialogContent
      class="max-w-[309px] bg-white dark:bg-(--color-sidebar) rounded-md"
    >
      <UiDialogTitle class="text-black dark:text-white"
        >Add New Column</UiDialogTitle
      >
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 py-4">
          <ColumnSlot
            :columns="columns"
            :show-remove-button="columns.length > 1"
            :column-id="columnId"
            @add-column="handleAddNewColumn"
            @remove-column="handleRemoveColumn"
          />
        </div>
        <UiDialogFooter class="flex flex-col gap-3">
          <UiButton
            type="submit"
            class="bg-(--color-purple-light) text-white w-full rounded-3xl"
          >
            Save Changes
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
