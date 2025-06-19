<template>
  <div class="w-75">
    <IconsLogoLight v-if="isDark.value === 'light'" />
    <IconsLogoDark v-else />
  </div>
</template>

<script setup>
import { useColorMode } from "@vueuse/core";
import { computed, onMounted } from 'vue';

const isDark = useColorMode();

// Debug initial value
onMounted(() => {
  console.log('Initial color mode:', isDark.value);
});

</script>