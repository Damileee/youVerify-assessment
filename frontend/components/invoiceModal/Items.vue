<template>
  <div>
    <div class="flex items-center gap-5 mb-8">
      <h2 class="text-2xl font-semibold">Items</h2>
      <div class="flex-1 h-px bg-[#E3E6EF]"></div>
    </div>

    <section class="mb-10 overflow-x-auto no-scrollbar">
      <div class="min-w-[600px] space-y-6">
        <div
          v-for="item in items"
          :key="item.id"
          class="grid grid-cols-[252px_75px_135px_190px] gap-4 items-start"
        >
          <!-- Item description -->
          <div>
            <p class="text-[#1F1F23] text-base">{{ item.title }}</p>
            <p class="text-[13px] text-[#666F77]">{{ item.description }}</p>
          </div>

          <!-- Quantity -->
          <div class="text-right text-[#1F1F23] text-base">
            {{ item.quantity }}
          </div>

          <!-- Rate -->
          <div class="text-right text-[#1F1F23] text-base">
            {{ currency }}{{ item.rate.toLocaleString() }}
          </div>

          <!-- Amount -->
          <div class="text-right text-[#1F1F23] text-base">
            {{ currency }}{{ formatNumber(item.amount) }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { InvoiceItem } from "~/types/invoice";

defineProps<{
  items: InvoiceItem[];
  currency: string;
}>();

function formatNumber(value: number) {
  return value.toLocaleString();
}
</script>
