<template>
  <div class="flex h-screen bg-[#F5F6FA] font-sans">
    <!-- Sidebar -->
    <CommonSidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col lg:mx-10">
      <!-- Header -->
      <HeaderBar title="Invoice" />

      <!-- Page content -->
      <main class="p- flex-1 overflow-auto no-scrollbar pb-14">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSidebarOpen = ref(false);
</script>
