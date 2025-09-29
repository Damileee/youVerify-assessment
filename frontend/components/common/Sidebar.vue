<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed z-50 inset-y-0 left-0  bg-white shadow-md transform transition-transform duration-200',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static md:inset-0',
    ]"
  >
    <div class="px-6 my-10">
      <IconsLogo class="" />
    </div>
    <nav class="px-6">
      <NuxtLink
        v-for="link in sidebarLinks"
        :key="link.to"
        :to="link.to"
        :class="[
          'flex items-center gap-2 text-sm rounded-[32px] px-4 py-[14px] border-[10px] hover:text-[#4F4F4F] hover:bg-white group transition-colors',
          (
            link.to === '/'
              ? route.path === '/'
              : route.path.startsWith(link.to)
          )
            ? 'border-[#F8F8FB] text-[#4F4F4F]'
            : 'border-transparent text-[#697598]',
        ]"
      >
        <component
          :is="link.icon"
          :class="[
            'transition-opacity duration-200 group-hover:opacity-100',
            (
              link.to === '/'
                ? route.path === '/'
                : route.path.startsWith(link.to)
            )
              ? 'opacity-100'
              : 'opacity-80',
          ]"
        />
        <span class="whitespace-nowrap">{{ link.title }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import {
  IconsSettings,
  IconsHome,
  IconsOverview,
  IconsBeneficairy,
  IconsHelp,
  IconsInvoice,
} from "#components";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const props = defineProps<{ isOpen: boolean }>();

// Define the structure of sidebar links
interface SidebarLink {
  title: string;
  icon: any;
  to: string;
}

const sidebarLinks: SidebarLink[] = [
  { title: "Getting Started", icon: IconsHome, to: "#" },
  { title: "Overview", icon: IconsOverview, to: "#" },
  { title: "Accounts", icon: IconsHome, to: "#" },
  { title: "Invoice", icon: IconsInvoice, to: "/invoice" },
  {
    title: "Beneficiary Management",
    icon: IconsBeneficairy,
    to: "#",
  },
  { title: "Help Center", icon: IconsHelp, to: "#" },
  { title: "Settings", icon: IconsSettings, to: "#" },
];
</script>
