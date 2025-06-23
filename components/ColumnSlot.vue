<script setup lang="ts">

interface Props {
  columns: Column[];
  columnId: number;
  maxColumns?: number;
  showRemoveButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxColumns: 5,
  showRemoveButton: true
});

const emit = defineEmits<{
  (e: "add-column"): void;
  (e: "remove-column", columnId: number): void;
}>();

const handleAddNewColumn = () => {
  console.log(props.columns);
  if (props.columns.length >= 5) return;
  emit("add-column");
};

const handleRemoveColumn = (columnId: number) => {
  if (props.columns.length <= 1) return;
  emit("remove-column", columnId);
};


</script>

<template>
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
          v-if="showRemoveButton && columns.length > 1"
          type="button"
          @click="handleRemoveColumn(column.id)"
          class="text-(--color-gray-font) hover:text-red-500 transition-colors"
        >
          X
        </button>
      </div>
    </div>
    <UiButton
      @click="handleAddNewColumn"
      type="button"
      :disabled="columns.length >= maxColumns"
      class="bg-(--color-add-button) dark:bg-white text-(--color-purple-light) w-full rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      + Add New Column
    </UiButton>
  </div>
</template> 