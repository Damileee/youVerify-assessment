export enum InvoiceStatus {
  PAID = "paid",
  OVERDUE = "overdue",
  DRAFT = "draft",
  UNPAID = "unpaid",
}

export interface StatsCardData {
  title: string;
  value?: number;
  count?: number;
  status?: InvoiceStatus;
  currency?: string;
}

export interface InvoiceActionCardData {
  icon: any;
  title: string;
  subtitle?: string;
}

export interface Invoice {
  id: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}

export interface InvoiceGroup {
  date: string;
  invoices: Invoice[];
}
