import mongoose, { Schema, Document } from "mongoose";

export interface RecentActivityDoc extends Document {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  user?: string;
  invoiceId?: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecentActivitySchema = new Schema<RecentActivityDoc>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    timestamp: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String },
    invoiceId: { type: String },
    userId: { type: String, index: true },
  },
  { timestamps: true }
);

export const RecentActivity = mongoose.model<RecentActivityDoc>("RecentActivity", RecentActivitySchema);