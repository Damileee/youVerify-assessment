import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthCookies } from "~/composables/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const config = useRuntimeConfig();
  const { token, logout } = useAuthCookies();

  const apiClient = axios.create({
    baseURL: config.public.apiBaseUrl as string,
    timeout: Number(config.public.apiTimeout) || 5000,
  });

  // Attach token from sessionStorage
  apiClient.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  // Handle errors globally
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      apiClient,
    },
  };
});
