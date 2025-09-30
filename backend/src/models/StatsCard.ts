import mongoose, { Schema, Document } from "mongoose";

export interface StatsCardDoc extends Document {
  title: string;
  value: number;
  count: number;
  status: string;
  userId: string;
}

const StatsCardSchema = new Schema<StatsCardDoc>(
  {
    title: { type: String, required: true },
    value: { type: Number, required: true },
    count: { type: Number, required: true },
    status: {
      type: String,
      required: true,
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const StatsCard = mongoose.model<StatsCardDoc>(
  "StatsCard",
  StatsCardSchema
);