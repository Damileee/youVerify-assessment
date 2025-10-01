import { vi } from "vitest";
import { ref, computed, reactive } from "vue";
import { config } from "@vue/test-utils";

// Stub NuxtLink so it doesn’t throw warnings
config.global.stubs = {
  NuxtLink: {
    template: '<a :href="to"><slot /></a>',
    props: ["to"],
  },
};

// Expose Vue reactivity APIs globally so composables don’t crash
(globalThis as any).ref = ref;
(globalThis as any).computed = computed;
(globalThis as any).reactive = reactive;
(globalThis as any).definePageMeta = vi.fn();

// Mock Nuxt's #app
vi.mock("#app", () => {
  return {
    useNuxtApp: () => ({
      $toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
      },
    }),
  };
});

// Mock composables that depend on Nuxt runtime
vi.mock("~/composables/auth/useAuthCookies", () => {
  return {
    useAuthCookies: () => ({
      token: { value: "mock-token" },
      email: { value: "test@example.com" },
    }),
  };
});

// Also expose global useNuxtApp (for cases not resolved via import)
(globalThis as any).useNuxtApp = () => ({
  $toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
});