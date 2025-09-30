<template>
  <main>
    <div
      v-if="isLoading"
      class="flex items-center justify-center mt-[270px] py-20"
    >
      <div class="flex flex-col items-center gap-4 text-center">
        <div
          class="w-12 h-12 border-4 border-primary-dark border-t-transparent rounded-full animate-spin"
        ></div>
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-montserrat font-medium text-primary-dark">
            Loading Invoice Dashboard
          </h2>
          <p class="text-sm font-montserrat text-primary-dark opacity-60">
            Preparing your Invoice Data...
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="getInvoiceDashboardSWR.error?.value"
      class="flex items-center justify-center py-20"
    >
      <p>This page is under construction. Come back in a bit!</p>
    </div>

    <div v-else>
      <section
        class="flex max-lg:flex-col justify-between items-center mt-10 gap-4"
      >
        <h1 class="text-[32px] font-medium">Invoice</h1>
        <div class="flex gap-3">
          <button class="btn-base py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-12">
            SEE WHAT’S NEW
          </button>

          <button class="btn-base py-3 px-12 sm:py-4 sm:px-10 lg:py-5 lg:px-20">
            CREATE
          </button>
        </div>
      </section>

      <section
        class="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8"
      >
        <StatsCard
          v-for="card in statsCards"
          :key="card.title"
          :title="card.title"
          :count="card.count || 0"
          :value="card.value || 0"
          :status="card.status"
        />
      </section>

      <section class="mt-10">
        <div class="flex items-center gap-4 mb-6">
          <h2 class="text-2xl font-semibold">Invoice Actions</h2>
          <div class="flex-1 h-px bg-[#FFFFFF]"></div>
        </div>

        <div
          class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8"
        >
          <InvoiceActionCard
            v-for="action in actions"
            :key="action.title"
            :icon="action.icon"
            :title="action.title"
            :subtitle="action.subtitle"
          />
        </div>
      </section>

      <section class="mt-6 flex gap-8 flex-col xl:flex-row">
        <RecentInvoices
          :invoiceGroups
          @selectedInvoice="openInvoiceDetailsModal"
          class=""
        />
        <ContainerInvoice
          title="Recent Activities"
          buttonLabel="View All"
          @buttonClick="
            () => {
              /* Handle button click */
            }
          "
        >
          <ActivityList
            :activities="latestActivities"
            :variant="ActivityVariant.LIST"
            class="mt-2"
          />
        </ContainerInvoice>
      </section>

      <InvoiceModal
        :isOpen="isOpen"
        :onClose="() => (isOpen = false)"
        :invoice="invoice"
        :activities="modalLatestActivities"
        @duplicate="handleDuplicate"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  IconsMoney,
  IconsSettings,
  IconsBeneficairy,
  IconsAvatar,
} from "#components";
import {
  type InvoiceData,
  type InvoiceGroup,
  type StatsCardData,
  type InvoiceActionCardData,
  type InvoiceDashboard,
} from "@/types/invoice";
import { ActivityVariant, type ActivityItem } from "~/types/activity";
import {
  useGetInvoiceDashboard,
  useDuplicateInvoice,
} from "~/composables/invoice";
import { useErrorHandler, useSocket } from "@/composables/common";
import { useDashboardStorage } from "~/composables/invoice/useDashboardStorage";

definePageMeta({
  layout: "default",
});

//Define variables
const { on } = useSocket();
const isOpen = ref(false);
const isLoading = ref(true); // start true until data is ready
const duplicateSWR = useDuplicateInvoice();
const getInvoiceDashboardSWR = useGetInvoiceDashboard();
const { getDashboard, setDashboard } = useDashboardStorage();

// hydrate immediately from cache
const invoiceDashboard = ref<InvoiceDashboard | null>(getDashboard());

//Define computed properties
const statsCards = computed(
  () => (invoiceDashboard.value?.statsCards as StatsCardData[]) || []
);
const invoiceGroups = computed(
  () => (invoiceDashboard.value?.recentInvoices as InvoiceGroup[]) || []
);
const activities = computed(
  () => (invoiceDashboard.value?.recentActivities as ActivityItem[]) || []
);
const invoice = computed(
  () => (invoiceDashboard.value?.invoices as InvoiceData) || {}
);
const latestActivities = computed(() => {
  return activities.value.slice(0, 4);
});
const modalLatestActivities = computed(() => {
  return activities.value.slice(0, 6);
});

// Async functions
async function getInvoiceDashboard() {
  try {
    isLoading.value = true;
    await getInvoiceDashboardSWR.action();
    const fresh = getInvoiceDashboardSWR.data.value?.data;
    if (fresh) {
      invoiceDashboard.value = fresh;
      setDashboard(fresh); // keep cache updated
    }
  } catch (error) {
    useErrorHandler(error);
  } finally {
    isLoading.value = false;
  }
}

async function handleDuplicate() {
  await duplicateSWR.action();
}

//Define helper functions
function openInvoiceDetailsModal(id: string) {
  console.log("Selected Invoice ID:", id);
  isOpen.value = true;
}

function handleBeforeUnload() {
  isLoading.value = true;
}

// Sockets
on(
  "invoice:duplicated",
  (newInvoiceGroups: { date: string; invoices: any[] }[]) => {
    if (!invoiceDashboard.value) return;

    const dashboard = invoiceDashboard.value;

    // Flatten into invoices with their date
    const flattenedInvoices = newInvoiceGroups.flatMap((g) =>
      g.invoices.map((inv) => ({
        ...inv,
        date: g.date,
      }))
    );

    // Flatten existing too
    const existingFlattened = dashboard.recentInvoices.flatMap((g) =>
      g.invoices.map((inv) => ({
        ...inv,
        date: g.date,
      }))
    );

    // Merge & cap to 5 invoices only
    const merged = [...flattenedInvoices, ...existingFlattened].slice(0, 5);

    // Rebuild grouped structure
    const regrouped = merged.reduce<{ date: string; invoices: any[] }[]>(
      (acc, inv) => {
        const group = acc.find((g) => g.date === inv.date);
        const { date, ...invoiceWithoutDate } = inv;

        if (group) {
          group.invoices.push(invoiceWithoutDate);
        } else {
          acc.push({ date, invoices: [invoiceWithoutDate] });
        }
        return acc;
      },
      []
    );

    dashboard.recentInvoices = regrouped;
  }
);

on("recentActivity:created", (newActivity: ActivityItem) => {
  if (invoiceDashboard.value) {
    invoiceDashboard.value.recentActivities = [
      newActivity,
      ...invoiceDashboard.value.recentActivities,
    ];
  }
});

const actions: InvoiceActionCardData[] = [
  {
    icon: IconsMoney,
    title: "Create New Invoice",
    subtitle: "Create new invoices easily",
  },
  {
    icon: IconsSettings,
    title: "Change Invoice settings",
    subtitle: "Customise your invoices",
  },
  {
    icon: IconsBeneficairy,
    title: "Manage Customer list",
    subtitle: "Add and remove customers",
  },
];

//Define helper functions
onMounted(() => {
  getInvoiceDashboard();
  if (import.meta.client) {
    window.addEventListener("beforeunload", handleBeforeUnload);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  }
});
</script>
