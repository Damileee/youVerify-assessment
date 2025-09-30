import { io } from "socket.io-client";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const socket = io(config.public.apiUrl, {
    transports: ["websocket"],
  });

  return {
    provide: {
      socket,
    },
  };
});
