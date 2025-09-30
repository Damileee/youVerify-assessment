import { duplicateInvoice } from "~/services/invoice.service";
import { useSWR } from "@/composables/common/useSWR";
import { useErrorHandler } from "../common/useErrorHandler";

export function useDuplicateInvoice() {
  const { data, error, loading, action } = useSWR(
    async () => await duplicateInvoice(),
    {
      autoExecute: false,
      onSuccess: (data) => {},
      onError: (error: any) => {
        useErrorHandler(error);
      },
    },
  );

  return {
    data, // duplicated invoice + recentActivity
    error,
    loading,
    action,
  };
}
