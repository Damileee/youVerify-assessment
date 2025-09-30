export const getInvoiceDashboard = async () => {
  const { $apiClient } = useNuxtApp();
  return $apiClient.get("/dashboard");
};

export const duplicateInvoice = async () => {
  const { $apiClient } = useNuxtApp();
  return $apiClient.post("/invoices/duplicate");
};
