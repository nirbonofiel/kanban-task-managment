<script setup lang="ts">
const colorMode = useColorMode();
const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

function toggleDark() {
  isDark.value = !isDark.value;
  colorMode.value = isDark.value ? "dark" : "light";
  document.documentElement.classList.toggle("dark");
}
</script>

<template>
  <div class="flex items-center ml-6 bg-(--color-switch-box) justify-center rounded-md w-60 h-12">
    <IconsMoonIcon class="h-5 w-5 text-(--color-gray-font)" />
    <UiSwitch
        :model-value="!isDark"
        @update:model-value="toggleDark"
        class="bg-(--color-purple-light)"
      />
    <IconsSunIcon class="h-5 w-5 text-(--color-gray-font)" />
  </div>
</template>


