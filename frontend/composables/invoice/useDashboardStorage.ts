import { type InvoiceDashboard } from "@/types/invoice";

const DASHBOARD_KEY = "invoiceDashboard";

export function useDashboardStorage() {
  const getDashboard = (): InvoiceDashboard | null => {
    if (import.meta.client) {
      const raw = localStorage.getItem(DASHBOARD_KEY);
      return raw ? JSON.parse(raw) : null;
    }
    return null;
  };

  const setDashboard = (data: InvoiceDashboard) => {
    if (import.meta.client) {
      localStorage.setItem(DASHBOARD_KEY, JSON.stringify(data));
    }
  };

  const clearDashboard = () => {
    if (import.meta.client) {
      localStorage.removeItem(DASHBOARD_KEY);
    }
  };

  return { getDashboard, setDashboard, clearDashboard };
}
