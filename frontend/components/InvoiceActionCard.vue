<template>
  <div
    class="btn-base flex flex-col items-start py-8 px-9 !rounded-3xl shadow-sm transition-all duration-150 cursor-pointer w-full group"
    role="button"
    aria-label="invoice action card"
  >
    <!-- Icon -->
    <div class="mb-4">
      <component :is="icon" width="80" height="80" />
    </div>

    <!-- Title -->
    <h3
      class="text-[22px] font-medium mb-2 text-[#373B47] group-hover:text-white"
    >
      {{ title }}
    </h3>

    <!-- Subtitle -->
    <p class="text-sm text-[#697598] group-hover:text-[#F6F8FA]">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: any;
  title: string;
  subtitle?: string;
}

const props = defineProps<Props>();
</script>
