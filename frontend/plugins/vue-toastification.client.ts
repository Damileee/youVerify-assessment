import { defineNuxtPlugin } from "#app";
import Toast, { useToast as useToastFn } from "vue-toastification";
import { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
  });

  return {
    provide: {
      toast: useToastFn, // injects as $toast
    },
  };
});
