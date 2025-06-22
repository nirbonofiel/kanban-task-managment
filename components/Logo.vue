<template>
  <div class="w-75">
    <IconsLogoLight v-if="darkMode" />
    <IconsLogoDark v-else />
  </div>
</template>

<script setup>
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
const store = useStore()
const { darkMode } = storeToRefs(store)

</script>