import { RecentActivity } from "../models/RecentActivity.js";

export const seedRecentActivities = async ( userId: string ) => {
  try {
    // remove old
    await RecentActivity.deleteMany({ userId });

    const activities = [
      {
        id: "1",
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
      {
        id: "2",
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
      {
        id: "3",
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
      {
        id: "4",
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
    ];

    await RecentActivity.insertMany(activities);
    console.log("✅ Recent activities (list) seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding recent activities:", err);
  }
}