import type { AxiosInstance } from "axios";

declare module "#app" {
  interface NuxtApp {
    $apiClient: AxiosInstance;
  }
}

declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp {
    $apiClient: AxiosInstance;
  }
}
