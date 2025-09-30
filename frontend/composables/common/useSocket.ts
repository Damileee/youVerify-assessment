import { useNuxtApp } from "#app";
import type { Socket } from "socket.io-client";

export function useSocket() {
  if (import.meta.server) {
    // During SSR, socket is not available
    return {
      socket: null,
      on: () => {},
      emit: () => {},
      off: () => {},
    };
  }

  const { $socket } = useNuxtApp();

  if (!$socket) {
    throw new Error("❌ Socket not available. Did you register the plugin?");
  }

  function on<T>(event: string, callback: (data: T) => void) {
    $socket.on(event, callback);
  }

  function emit<T>(event: string, payload: T) {
    $socket.emit(event, payload);
  }

  function off(event?: string) {
    $socket.off(event);
  }

  return { socket: $socket as Socket, on, emit, off };
}
