import axios from "axios";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const config = useRuntimeConfig();

  const apiClient = axios.create({
    baseURL: config.public.apiBaseUrl as string,
    timeout: Number(config.public.apiTimeout) || 5000,
  });

  // Attach token from sessionStorage
  apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("firebaseToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle errors globally
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("firebaseToken");
        router.push("/auth/signin");
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
