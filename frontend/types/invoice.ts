import type { ActivityItem } from "./activity";
// Enums for Invoice Management
export enum InvoiceStatus {
  PAID = "paid",
  OVERDUE = "overdue",
  DRAFT = "draft",
  UNPAID = "unpaid",
}

export enum ModalInvoiceStatus {
  PAID = "paid",
  PARTIAL = "partial",
  DUE = "due",
  OVERDUE = "overdue",
}

// Interfaces for Invoice Data Structures
export interface StatsCardData {
  title: string;
  value: number;
  count: number;
  status: InvoiceStatus;
  updatedAt: string;
  createdAt: string;
}

export interface InvoiceDashboard {
  statsCards: StatsCardData[];
  recentActivities: ActivityItem[];
  recentInvoices: InvoiceGroup[];
  invoices: InvoiceData;
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
export interface InvoiceItem {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface PartyInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface InvoiceData {
  id: string;
  number: string;
  status: ModalInvoiceStatus;
  issueDate: string;
  dueDate: string;
  currency: string;
  sender: PartyInfo;
  customer: PartyInfo;
  items: InvoiceItem[];
  subtotal: number;
  discount?: number;
  total: number;
  note?: string;
}
