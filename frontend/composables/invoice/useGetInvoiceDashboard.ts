import { getInvoiceDashboard } from "~/services/invoice.service";
import { useSWR } from "@/composables/common/useSWR";
import { useErrorHandler } from "../common/useErrorHandler";

export function useGetInvoiceDashboard() {
  const { data, error, loading, action } = useSWR(
    async () => await getInvoiceDashboard(),
    {
      autoExecute: false,
      onSuccess: (data) => {},
      onError: (error: any) => {
        useErrorHandler(error);
      },
    },
  );

  return {
    data,
    error,
    loading,
    action,
  };
}
