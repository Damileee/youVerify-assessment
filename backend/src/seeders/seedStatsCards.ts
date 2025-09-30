import { StatsCard } from "../models/StatsCard.js";


export const seedStatsCards = async (userId: string) => {
  try {
    // Clear existing data
    await StatsCard.deleteMany({ userId });

    // Dummy data from frontend
    const statsCards = [
      {
        title: "Total Paid",
        value: 4120102.76,
        count: 1289,
        status: "paid",
        userId,
      },
      {
        title: "Total Overdue",
        value: 23000.13,
        count: 13,
        status: "overdue",
        userId,
      },
      {
        title: "Total Draft",
        value: 12200.0,
        count: 8,
        status: "draft",
        userId,
      },
      {
        title: "Total Unpaid",
        value: 87102.0,
        count: 6,
        status: "unpaid",
        userId,
      },
    ];

    await StatsCard.insertMany(statsCards);
  } catch (error) {
    console.error("❌ Error seeding stats cards:", error);
  }
};