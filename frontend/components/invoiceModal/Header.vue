<template>
  <header class="sticky top-0 z-20 flex items-start justify-between gap-4 pb-8">
    <div>
      <h2 class="text-xl lg:text-[32px] font-bold text-[#1F1F23]">
        Invoice - {{ invoice.number }}
      </h2>
      <p class="lg:text-base text-sm text-[#697598] mt-2">
        View the details and activity of this invoice
      </p>
      <div
        class="bg-[#F2FBFF] py-[10px] px-4 border border-[#003EFF33] rounded-3xl w-fit mt-6"
      >
        <p class="text-[#003EFF] text-[10px] font-medium">
          {{ invoice.status.toUpperCase() }} PAYMENT
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="hidden sm:inline-flex rounded-full border border-[#E3E6EF] px-6 py-3 lg:text-base text-sm font-medium text-[#003EFF] hover:bg-gray-50"
      >
        DOWNLOAD AS PDF
      </button>

      <button
        class="rounded-full px-6 py-3 lg:text-base text-sm font-medium text-white bg-[#003EFF] hover:bg-blue-700"
      >
        SEND INVOICE
      </button>

      <div class="hidden sm:block relative">
        <button
          class="rounded-full border border-[#E3E6EF] px-4 py-3 lg:text-base text-sm font-medium text-[#373B47] hover:bg-gray-50"
        >
          More
        </button>
      </div>

      <!-- Mobile close -->
      <button
        @click="onClose"
        class="hidden max-sm:block h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        ✕
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { InvoiceData } from "~/types/invoice";

defineProps<{
  invoice: InvoiceData;
  onClose: () => void;
}>();
</script>
