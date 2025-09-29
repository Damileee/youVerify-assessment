<template>
  <ContainerInvoice
    title="Recent Invoices"
    buttonLabel="View All invoices"
    @buttonClick="
      () => {
        /* Handle button click */
      }
    "
  >
    <div class="space-y-6">
      <div v-for="(group, gIndex) in invoiceGroups" :key="gIndex">
        <!-- Group Header -->
        <p class="text-xs font-medium text-[#1F1F23] my-[10px]">
          {{ group.date }}
        </p>

        <!-- Invoices in Group -->
        <div>
          <InvoiceItem
            v-for="(invoice, iIndex) in group.invoices"
            :key="iIndex"
            @select="handleSelect"
            v-bind="invoice"
          />
        </div>
      </div>
    </div>
  </ContainerInvoice>
</template>

<script setup lang="ts">
import type { Invoice } from "~/types/invoice";

const props = defineProps<{
  invoiceGroups: {
    date: string;
    invoices: Invoice[];
  }[];
}>();
const emit = defineEmits<{
  (e: 'selectedInvoice', id: string): void;
}>();

const handleViewAll = () => {
  console.log("View all invoices clicked");
};

// Function to handle invoice selection
function handleSelect(id: string) {
  emit('selectedInvoice', id);
}
</script>
