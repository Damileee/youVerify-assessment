<template>
  <section class="mb-8 rounded-3xl border border-[#E3E6EF] py-4 px-6">
    <h4 class="text-xs font-medium text-[#697598] mb-2">PAYMENT INFORMATION</h4>
    <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div>
        <p class="text-[10px] text-[#666F77] mb-1">ACCOUNT NAME</p>
        <p class="text-xs font-medium text-[#1F1F23]">{{ invoice.id }}</p>
      </div>
      <div>
        <p class="text-[10px] text-[#666F77] mb-1">ACCOUNT NAME</p>
        <p class="text-xs font-medium text-[#1F1F23]">{{ invoice.id }}</p>
      </div>
      <div>
        <p class="text-[10px] text-[#666F77] mb-1">ACH ROUTING NO</p>
        <p class="text-xs font-medium text-[#1F1F23]">{{ invoice.id }}</p>
      </div>
      <div>
        <p class="text-[10px] text-[#666F77] mb-1">BANK NAME</p>
        <p class="text-xs font-medium text-[#1F1F23]">USD ($)</p>
      </div>
      <div>
        <p class="text-[10px] text-[#666F77] mb-1">BANK ADDRESS</p>
        <p class="text-xs font-medium text-[#1F1F23]">{{ invoice.id }}</p>
      </div>
      <div>
        <p class="text-[10px] text-[#666F77] mb-1">ACCOUNT NUMBER</p>
        <p class="text-xs font-medium text-[#1F1F23]">{{ invoice.id }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InvoiceData } from "~/types/invoice";

defineProps<{ invoice: InvoiceData }>();
</script>
