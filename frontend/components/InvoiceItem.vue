<template>
  <div
    class="flex items-center justify-between px-3 max-sm:px-1 lg:px-6 pt-4 pb-[25px]"
  >
    <div class="font-medium text-sm text-[#373B47] flex flex-col gap-1">
      <p>Invoice -</p>
      <p>{{ id }}</p>
    </div>

    <div>
      <p class="text-[10px] text-[#666F77]">DUE DATE</p>
      <p class="text-sm font-medium text-[#697598]">{{ dueDate }}</p>
    </div>

    <div class="flex flex-col items-end gap-3">
      <p class="font-medium text-base text-[#373B47]">
        ${{ formatNumber(amount) }}
      </p>
      <span
        class="text-[7.5px] font-medium px-3 py-1 border-[0.75px] rounded-full"
        :class="statusClasses[status]"
      >
        {{ status.toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InvoiceStatus } from "@/types/invoice";

defineProps<{
  id: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}>();

const statusClasses: Record<InvoiceStatus, string> = {
  [InvoiceStatus.PAID]: "text-[#129043] bg-[#E6FFF0] border-[#12904333]",
  [InvoiceStatus.OVERDUE]: "text-[#FF5663] bg-[#FFF4F5] border-[#FF566333]",
  [InvoiceStatus.DRAFT]: "text-[#373B47] bg-[#F6F8FA] border-[#373B4733]",
  [InvoiceStatus.UNPAID]: "text-[#D98F00] bg-[#FFF8EB] border-[#D98F0033]",
};
</script>
