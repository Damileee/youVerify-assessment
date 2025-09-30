<template>
  <div
    class="flex flex-col gap-4 justify-between py-8 px-10 rounded-3xl bg-white w-full"
  >
    <IconsOverview :width="40" :height="40" />

    <div>
      <div class="flex items-center gap-2">
        <p class="text-xs text-[#697598] tracking-wide">
          {{ title.toUpperCase() }}
        </p>
        <div
          :class="[
            'py-2 px-4 rounded-3xl text-sm font-medium text-[#373B47]',
            status === InvoiceStatus.PAID
              ? 'bg-[#B6FDD3]'
              : status === InvoiceStatus.OVERDUE
                ? 'bg-[#FFB7BD]'
                : status === InvoiceStatus.DRAFT
                  ? 'bg-[#D9D9E0]'
                  : 'bg-[#F8E39B]',
          ]"
          data-testid="status-count"
        >
          {{ count.toLocaleString() }}
        </div>
      </div>

      <!-- Value with styled decimals -->
      <p class="mt-2 font-medium text-2xl">
        {{ currency }}<span>{{ formattedValue.integer }}.</span
        ><span
          v-if="formattedValue.decimal"
          class="text-sm align-baseline text-[#697598]"
          >{{ formattedValue.decimal }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconsOverview from "./icons/Overview.vue";
import { computed } from "vue";
import { InvoiceStatus } from "@/types/invoice";

interface Props {
  title: string;
  value: number;
  count: number;
  status?: InvoiceStatus;
  currency?: string;
}

const props = defineProps<Props>();

// Default currency
const currency = computed(() => props.currency ?? "$");

// Separate integer and decimal parts
const formattedValue = computed(() => {
  if (!props.value) return { integer: "0", decimal: "00" };

  const parts = props.value.toFixed(2).split(".") as [string, string];
  return {
    integer: parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    decimal: parts[1],
  };
});

const statusLabel = computed(() => {
  switch (props.status) {
    case InvoiceStatus.PAID:
      return "Paid";
    case InvoiceStatus.OVERDUE:
      return "Overdue";
    case InvoiceStatus.DRAFT:
      return "Draft";
    case InvoiceStatus.UNPAID:
      return "Unpaid";
    default:
      return "";
  }
});
</script>
