<template>
  <div class="bg-[#F6F8FA] pt-4 pb-6 px-6 rounded-3xl mb-8">
    <p class="text-sm text-[#B7BDCF]">NOTE</p>
    <p class="text-base text-[#666F77]">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ note: string }>();
</script>
