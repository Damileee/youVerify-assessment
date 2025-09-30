import mongoose, { Schema, Document } from "mongoose";

export interface RecentInvoiceDoc extends Document {
  id: string;
  number: string;
  dueDate: Date;
  amount: number;
  status: string;
  dateGroup: string; // e.g. "TODAY - 27TH NOVEMBER, 2022"
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecentInvoiceSchema = new Schema<RecentInvoiceDoc>(
  {
    id: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
    },
    dateGroup: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const RecentInvoice = mongoose.model<RecentInvoiceDoc>(
  "RecentInvoice",
  RecentInvoiceSchema
);