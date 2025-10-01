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
          {{ invoice.status?.toUpperCase() }} PAYMENT
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
        class="hidden sm:inline-flex rounded-full px-6 py-3 lg:text-base text-sm font-medium text-white bg-[#003EFF] hover:bg-blue-700"
      >
        SEND INVOICE
      </button>

      <!-- More Dropdown -->
      <div ref="dropdownRef" class="hidden sm:block relative">
        <button
          @click="toggleDropdown"
          class="rounded-full border border-[#E3E6EF] px-4 py-3 lg:text-base text-sm font-medium text-[#373B47] hover:bg-gray-50"
        >
          More
        </button>

        <!-- Dropdown menu -->
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-if="isOpen"
            class="absolute right-0 mt-2 w-[242px] rounded-3xl border border-[#E3E6EF] bg-white shadow-lg p-4"
          >
            <button
              @click="duplicateInvoice"
              class="block w-full text-left px-4 py-3 text-sm font-medium text-[#697598] hover:bg-gray-100"
            >
              Duplicate Invoice
            </button>
            <button
              @click="getSharableLink"
              class="block w-full text-left px-4 py-3 text-sm font-medium text-[#697598] hover:bg-gray-100"
            >
              Get Sharable Link
            </button>
          </div>
        </transition>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { InvoiceData } from "~/types/invoice";

defineProps<{
  invoice: InvoiceData;
  onClose: () => void;
}>();

const emit = defineEmits<{
  (e: "duplicate"): void;
  (e: "share"): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function duplicateInvoice() {
  emit("duplicate");
  isOpen.value = false;
}

function getSharableLink() {
  emit("share");
  isOpen.value = false;
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
