import { RecentInvoice } from "../models/RecentInvoice.js";


export const seedRecentInvoices = async (userId: string) => {
  try {
    await RecentInvoice.deleteMany({ userId });

    const invoices = [
      {
        id: "1",
        number: "1023494 - 2304",
        dueDate: new Date("2023-05-19"),
        amount: 1311750.12,
        status: "paid",
        dateGroup: "TODAY - 27TH NOVEMBER, 2022",
        userId,
      },
      {
        id: "2",
        number: "1023494 - 2304",
        dueDate: new Date("2023-05-19"),
        amount: 1311750.12,
        status: "overdue",
        dateGroup: "TODAY - 27TH NOVEMBER, 2022",
        userId,
      },
      {
        id: "3",
        number: "1023494 - 2304",
        dueDate: new Date("2023-05-19"),
        amount: 1311750.12,
        status: "draft",
        dateGroup: "8TH DECEMBER, 2022",
        userId,
      },
      {
        id: "4",
        number: "1023494 - 2304",
        dueDate: new Date("2023-05-19"),
        amount: 1311750.12,
        status: "unpaid",
        dateGroup: "8TH DECEMBER, 2022",
        userId,
      },
      {
        id: "5",
        number: "1023494 - 2304",
        dueDate: new Date("2023-05-19"),
        amount: 1311750.12,
        status: "paid",
        dateGroup: "8TH DECEMBER, 2022",
        userId,
      },
    ];

    await RecentInvoice.insertMany(invoices);
    console.log("✅ Recent invoices seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding recent invoices", error);
  }
}