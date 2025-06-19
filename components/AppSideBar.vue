<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar/utils";
import { useStore } from "@/store/store";

const { boards, activeBoard } = useStore();
const { toggleSidebar, open } = useSidebar();
</script>

<template>
  <UiSidebar :class="open ? 'w-75' : ''">
    <UiSidebarHeader class="py-8"> </UiSidebarHeader>
    <UiSidebarContent>
      <UiSidebarGroup class="pt-4 pl-0">
        <UiSidebarGroupLabel
          class="text-(--color-gray-font) tracking-widest text-xs pl-8 mb-2"
          >ALL BOARDS ({{ boards.length }})</UiSidebarGroupLabel
        >
        <UiSidebarGroupContent >
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="board in boards" :key="board.id">
              <UiSidebarMenuButton asChild class="w-3xs h-12">
                <div
                  class="flex items-center gap-2 pl-8 transition-all duration-300 cursor-pointer rounded-md"
                  :class="
                    activeBoard === board.id
                      ? 'text-white bg-(--color-purple-light) rounded-r-3xl rounded-l-none'
                      : 'text-(--color-gray-font) hover:text-white hover:bg-(--color-purple-light-hover) hover:rounded-r-3xl hover:rounded-l-none'
                  "
                >
                  <IconsBoardIcon :fill="activeBoard === board.id ? 'white' : '#828FA3'"/>
                  <span class="ml-2 text-base font-medium">{{ board.name }}</span>
                </div>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>        
            <UiSidebarMenuItem>
            <UiSidebarMenuButton asChild class="w-3xs">
              <div class="flex items-center gap-2 pl-8  cursor-pointer text-(--color-purple-light) hover:opacity-[.6]">
                <IconsBoardIcon fill="#635FC7"/>
                <span class="ml-2 text-base font-medium">+ Create new board</span>
              </div>
            </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
    <UiSidebarFooter class="pb-8">
      <SwitchMode />
      <UiButton
        size="lg"
        @click="toggleSidebar"
        variant="ghost"
        class="hover:text-(--color-gray-font-hover) cursor-pointer text-(--color-gray-font)"
      >
        <IconsHideSidebar />
        Hide Sidebar
      </UiButton>
    </UiSidebarFooter>
    <UiSidebarTrigger
      v-if="!open"
      class="bg-(--color-purple-light) fixed flex align-center rounded-r-3xl rounded-l-none justify-center left-0 bottom-8 w-14 h-12"
    />
  </UiSidebar>
</template>
