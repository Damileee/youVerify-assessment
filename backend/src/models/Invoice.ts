import mongoose, { Schema, Document } from "mongoose";

export interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceDoc extends Document {
  id: string;
  number: string;
  status: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  sender: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  total: number;
  note: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<InvoiceDoc>(
  {
    id: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    status: {
      type: String,
      default: "draft",
    },
    issueDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    currency: { type: String, required: true },
    sender: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    note: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model<InvoiceDoc>("Invoice", InvoiceSchema);