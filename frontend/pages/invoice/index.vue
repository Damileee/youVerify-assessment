<template>
  <main>
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
      <RecentInvoices :invoiceGroups @selectedInvoice="openInvoiceDetailsModal" class="" />
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
          :activities="activities"
          :variant="ActivityVariant.LIST"
          class="mt-2"
        />
      </ContainerInvoice>
    </section>

    <InvoiceModal
      :isOpen="isOpen"
      :onClose="() => (isOpen = false)"
      :invoice="invoice"
      :activities
    />
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
  InvoiceStatus,
  ModalInvoiceStatus,
  type InvoiceData,
  type InvoiceGroup,
  type StatsCardData,
  type InvoiceActionCardData,
} from "@/types/invoice";
import { ActivityVariant, type ActivityItem } from "~/types/activity";

const isOpen = ref(false);

function openInvoiceDetailsModal(id: string) {
  console.log("Selected Invoice ID:", id);
  isOpen.value = true;
}

const statsCards: StatsCardData[] = [
  {
    title: "Total Paid",
    value: 4120102.76,
    count: 10,
    status: InvoiceStatus.PAID,
  },
  {
    title: "Total Overdue",
    value: 23000.13,
    count: 0,
    status: InvoiceStatus.OVERDUE,
  },
  {
    title: "Total Draft",
    value: 12200.0,
    count: 0,
    status: InvoiceStatus.DRAFT,
  },
  {
    title: "Total Unpaid",
    value: 87102.0,
    count: 0,
    status: InvoiceStatus.UNPAID,
  },
];

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

const invoiceGroups: InvoiceGroup[] = [
  {
    date: "TODAY - 27TH NOVEMBER, 2022",
    invoices: [
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: InvoiceStatus.PAID,
      },
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: InvoiceStatus.OVERDUE,
      },
    ],
  },
  {
    date: "8TH DECEMBER, 2022",
    invoices: [
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: InvoiceStatus.DRAFT,
      },
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: InvoiceStatus.UNPAID,
      },
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: InvoiceStatus.PAID,
      },
    ],
  },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    avatar: IconsAvatar,
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
  },
  {
    id: "2",
    avatar: IconsAvatar,
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
  },
  {
    id: "3",
    avatar: IconsAvatar,
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
  },
  {
    id: "4",
    avatar: IconsAvatar,
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
  },
];

const invoice: InvoiceData = {
  id: '1023902390',
  number: '1023494-2304',
  status: ModalInvoiceStatus.PARTIAL,
  issueDate: 'March 30th, 2023',
  dueDate: 'May 19th, 2023',
  currency: '$',
  sender: {
    name: 'Fabulous Enterprise',
    email: 'info@fabulousenterise.co',
    phone: '+386 989 271 3115',
    address: '133 Hart Ridge Road, 45436 Gaines, MI',
  },
  customer: {
    name: 'Olaniyi Ojo Adewale',
    email: 'info@customeremail.com',
    phone: '+386 989 271 3115',
  },
  items: [
    { id: '1', title: 'Email Marketing', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium', quantity: 10, rate: 1500, amount: 15000 },
    { id: '2', title: 'Video looping effect', description: '', quantity: 6, rate: 110500, amount: 6663000 },
    { id: '3', title: 'Graphic design for emails', description: 'Tsit voluptatem accusantium', quantity: 7, rate: 2750, amount: 19250 },
    { id: '4', title: 'Video looping effect', description: '', quantity: 6, rate: 110500, amount: 6663000 },
  ],
  subtotal: 6697200,
  discount: 167430,
  total: 6529770,
  note: 'Thank you for your patronage',
}

const Modalactivities: ActivityItem[] = [
  {
    id: '1',
    user: 'You',
    avatar: IconsAvatar,
    title: 'Created',
    timestamp: 'Today, 12:20 PM',
    description: 'Created invoice <b>00239434/Olaniyi Ojo Adewale</b>',
  },
]

definePageMeta({
  layout: "default",
});
</script>
