import mongoose, { Schema, Document } from "mongoose";

export interface InvoiceDoc extends Document {
  number: string;
  sender: string;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "draft" | "pending" | "paid" | "overdue";
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<InvoiceDoc>(
  {
    number: { type: String, required: true, unique: true },
    sender: { type: String, required: true },
    customer: { type: String, required: true },
    items: [
      {
        name: String,
        qty: Number,
        price: Number,
      },
    ],
    total: Number,
    status: { type: String, enum: ["draft","pending","paid","overdue"], default: "draft" },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model<InvoiceDoc>("Invoice", InvoiceSchema);