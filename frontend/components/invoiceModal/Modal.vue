<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm sm:px-6"
      @click="onOverlayClick"
      role="dialog"
      aria-modal="true"
      aria-label="Invoice details"
    >
      <!-- Desktop close button -->
      <div class="hidden sm:flex md:max-w-[1334px] w-full justify-end mb-2">
        <button
          @click="onClose"
          class="h-9 w-9 self-end rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div
        class="relative md:p-10 p-6 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-[1334px] md:rounded-[30px] bg-white shadow-xl overflow-hidden"
      >
        <InvoiceModalHeader :invoice="invoice" :onClose="onClose" />

        <div class="h-full !overflow-y-auto no-scrollbar pb-32">
          <InvoiceModalReminders />

          <div class="flex flex-col xl:flex-row md:gap-6 xl:gap-14">
            <!-- Main -->
            <main class="flex-1 md:border md:border-[#E3E6EF] md:rounded-[30px] md:p-6">
              <InvoiceModalDetails :invoice="invoice" />
              <InvoiceModalItems :items="invoice.items" :currency="invoice.currency" />
              <InvoiceModalTotals :invoice="invoice" />
              <InvoiceModalPaymentInfo :invoice="invoice" />
              <InvoiceModalNote v-if="invoice.note" :note="invoice.note" />
            </main>

            <!-- Sidebar -->
            <aside class="w-full xl:w-[449px]">
              <InvoiceModalActivity :activities="activities" />
            </aside>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { ActivityItem } from "~/types/activity";
import type { InvoiceData } from "~/types/invoice";

const props = defineProps<{
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData;
  activities: ActivityItem[];
}>();

// ---- Helpers: scroll lock & ESC close ----
const restoreBodyOverflow = () => {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") props.onClose();
};

const onOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) props.onClose();
};

watch(
  () => props.isOpen,
  (open) => {
    if (typeof window === "undefined") return;
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeydown);
    } else {
      restoreBodyOverflow();
      window.removeEventListener("keydown", onKeydown);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  restoreBodyOverflow();
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
