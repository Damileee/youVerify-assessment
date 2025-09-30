import { RecentActivity } from "../models/RecentActivity.js";
import { nanoid } from 'nanoid';

export const seedRecentActivities = async ( userId: string ) => {
  try {
    // remove old
    await RecentActivity.deleteMany({ userId });

    const activities = [
      {
        id: nanoid(),
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
      {
        id: nanoid(),
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
      {
        id: nanoid(),
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
      {
        id: nanoid(),
        title: "Invoice creation",
        timestamp: "Yesterday, 12:05 PM",
        description: "Created invoice <b>00239434/Olaniyi Ojo Adewale</b>",
        userId,
      },
    ];

    await RecentActivity.insertMany(activities);
  } catch (err) {
    console.error("❌ Error seeding recent activities:", err);
  }
}