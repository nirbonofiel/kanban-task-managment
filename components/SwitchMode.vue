<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
const colorMode = useColorMode();
const isDark = ref(false);
const store = useStore()
const { toggleDark } = store

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

function toggleDarkMode() {
  isDark.value = !isDark.value;
  colorMode.value = isDark.value ? "dark" : "light";
  document.documentElement.classList.toggle("dark");
  toggleDark()
}
</script>

<template>
  <div class="flex items-center ml-6 bg-(--color-switch-box) justify-center rounded-md w-60 h-12">
    <IconsMoonIcon class="h-5 w-5 text-(--color-gray-font)" />
    <UiSwitch
        :model-value="!isDark"
        @update:model-value="toggleDarkMode"
        class="bg-(--color-purple-light)"
      />
    <IconsSunIcon class="h-5 w-5 text-(--color-gray-font)" />
  </div>
</template>


