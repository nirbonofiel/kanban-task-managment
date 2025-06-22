<template>
  <div class="flex  bg-white dark:bg-(--color-sidebar) text-white overflow-hidden">
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopBar />
      <UiSidebarProvider>
        <AppSideBar class="border-(--color-border) dark:border-(--color-border)"/>
        <div class="flex-1 overflow-hidden">
          <NuxtPage />
        </div>
      </UiSidebarProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSideBar from "@/components/AppSideBar.vue";
import { ref } from "vue";

</script>
