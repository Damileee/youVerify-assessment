<template>
  <section class="mb-6 rounded-[30px] bg-[#FCDDEC] p-6 md:p-8">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <h4 class="text-xs font-medium text-[#697598]">SENDER</h4>
        <div class="flex items-start gap-4 mt-3">
          <IconsInvoiceLogo />
          <div class="flex flex-col gap-2">
            <p class="text-base font-medium text-[#1F1F23]">
              {{ invoice.sender?.name }}
            </p>
            <p class="text-xs text-[#697598]">{{ invoice.sender?.phone }}</p>
            <p class="text-xs text-[#697598]">{{ invoice.sender?.address }}</p>
            <p class="text-xs text-[#697598]">{{ invoice.sender?.email }}</p>
          </div>
        </div>
      </div>

      <div class="md:justify-self-end">
        <h4 class="text-xs font-medium text-[#697598]">CUSTOMER</h4>
        <div class="flex flex-col gap-2 mt-3">
          <p class="text-base font-medium text-[#1F1F23]">
            {{ invoice.customer?.name }}
          </p>
          <p class="text-xs text-[#697598]">{{ invoice.customer?.phone }}</p>
          <p class="text-xs text-[#697598]">{{ invoice.customer?.email }}</p>
          <p class="text-xs text-[#697598]">{{ invoice.customer?.address }}</p>
        </div>
      </div>
    </div>

    <!-- Meta row -->
    <div class="mt-8">
      <h4 class="text-xs font-medium text-[#697598] mb-2">INVOICE DETAILS</h4>
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div>
          <p class="text-[10px] text-[#666F77] mb-1">INVOICE NO</p>
          <p class="text-xs font-medium text-[#1F1F23]">{{ invoice.id }}</p>
        </div>
        <div>
          <p class="text-[10px] text-[#666F77] mb-1">ISSUE DATE</p>
          <p class="text-xs font-medium text-[#1F1F23]">
            {{ invoice.issueDate }}
          </p>
        </div>
        <div>
          <p class="text-[10px] text-[#666F77] mb-1">DUE DATE</p>
          <p class="text-xs font-medium text-[#1F1F23]">
            {{ invoice.dueDate }}
          </p>
        </div>
        <div>
          <p class="text-[10px] text-[#666F77] mb-1">BILLING CURRENCY</p>
          <p class="text-xs font-medium text-[#1F1F23]">
            USD({{ invoice.currency }})
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InvoiceData } from "~/types/invoice";

defineProps<{ invoice: InvoiceData }>();
</script>
