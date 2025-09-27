import type { SWRState } from "~/models/state";

interface SWROptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  autoExecute?: boolean;
}

export function useSWR<T>(
  apiCall: (...args: any[]) => Promise<T>,
  options: SWROptions<T> = {},
): SWRState<T> {
  const data: Ref<T | null> = ref(null);
  const error: Ref<any | null> = ref(null);
  const loading: Ref<boolean> = ref(false);

  const action = async (...args: any[]) => {
    loading.value = true;
    try {
      const result: T = await apiCall(...args);
      data.value = result;
      options.onSuccess?.(result);
    } catch (err) {
      error.value = err;
      options.onError?.(err);
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, action };
}
