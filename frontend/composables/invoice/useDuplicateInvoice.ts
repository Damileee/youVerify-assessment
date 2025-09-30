import { duplicateInvoice } from "~/services/invoice.service";
import { useSWR } from "@/composables/common/useSWR";
import { useErrorHandler } from "../common/useErrorHandler";

export function useDuplicateInvoice() {
    const { $toast } = useNuxtApp();
  const { data, error, loading, action } = useSWR(
    async () => await duplicateInvoice(),
    {
      autoExecute: false,
      onSuccess: (data) => {
        const toast = $toast();
        toast.success("Invoice duplicated successfully! 🎉");
      },
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
