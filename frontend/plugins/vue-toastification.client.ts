import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification/dist/types/types/index";
import { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
  };
  nuxtApp.vueApp.use(Toast, options);
});
