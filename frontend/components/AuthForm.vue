<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"
      >
        {{ title }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <slot />

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ buttonText }}
          </button>
        </div>
      </form>

      <p v-if="footerText" class="mt-10 text-center text-sm text-gray-500">
        {{ footerText }}
        <NuxtLink
          :to="footerLink"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {{ footerAction }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  buttonText: string;
  onSubmit: () => void;
  footerText?: string;
  footerAction?: string;
  footerLink?: string;
}>();

const handleSubmit = () => {
  props.onSubmit();
};
</script>
