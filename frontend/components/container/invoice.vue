<template>
  <div
    :class="[
      'bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6 2xl:w-full',
      buttonLabel.includes('invoices') ? 'xl:w-[617px]' : '',
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ title }}
      </h2>

      <button
        v-if="buttonLabel"
        @click="emit('buttonClick')"
        class="btn-primary !text-xs py-2 px-4 md:py-3 md:px-8"
      >
        {{ buttonLabel }}
      </button>
    </div>

    <!-- Slot for content -->
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  buttonLabel?: string;
}>();

const emit = defineEmits<{
  (e: "buttonClick"): void;
}>();
</script>
