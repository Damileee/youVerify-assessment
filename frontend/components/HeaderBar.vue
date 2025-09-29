<template>
  <header
    class="flex items-center justify-between py-4 mt-2 border-b border-[#A1B8FF33]"
  >
    <!-- Page Title -->
    <h1 class="text-[28px] font-semibold tracking-widest text-[#373B47]">
      {{ title.toUpperCase() }}
    </h1>

    <div class="flex items-center space-x-4">
      <!-- Notification Icon -->
      <button class="bg-white p-3 rounded-full group">
        <IconsBell class="group-hover:opacity-70" />
      </button>

      <!-- User Avatar / Initials -->
      <div class="flex items-center cursor-pointer bg-white p-3 rounded-full">
        <div
          class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold"
        >
          {{ userInitials.substring(0, 2).toUpperCase() }}
        </div>

        <IconsArrowDown />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthCookies } from '~/composables/auth';
// Define component props
const props = defineProps<{
  title: string;
}>();

// user initials from session storage
const { email } = useAuthCookies();
const userInitials: Ref<string> = ref("");

// on mounted, get user initials from session storage
onMounted(() => {
  userInitials.value = email.value || '';
});
</script>
