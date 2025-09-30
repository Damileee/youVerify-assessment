<template>
  <section class="mb-8 flex justify-end">
    <div class="w-full max-w-[441px] space-y-3">
      <div class="flex justify-between">
        <span class="text-sm text-[#B7BDCF]">SUBTOTAL</span>
        <span class="text-xl text-[#373B47]">
          {{ invoice.currency }}{{ formatNumber(invoice.subtotal) }}
        </span>
      </div>

      <div v-if="invoice.discount" class="flex justify-between">
        <span class="text-sm text-[#B7BDCF]">DISCOUNT</span>
        <span class="text-xl text-[#373B47]">
          {{ invoice.currency }}{{ formatNumber(invoice.discount) }}
        </span>
      </div>

      <div class="flex justify-between text-[#373B47] pt-4">
        <span class="md:text-lg text-base font-medium">TOTAL AMOUNT DUE</span>
        <span class="md:text-2xl text-lg font-bold">
          {{ invoice.currency }}{{ formatNumber(invoice.total) }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InvoiceData } from "~/types/invoice";

defineProps<{ invoice: InvoiceData }>();
</script>
