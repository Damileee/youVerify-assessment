import express from "express";
import { StatsCard } from "../models/StatsCard.js";
import { RecentInvoice } from "../models/RecentInvoice.js";
import { RecentActivity } from "../models/RecentActivity.js";
import { Invoice } from "../models/Invoice.js";
import { verifyFirebaseToken } from "../utils/firebase.js";
import { seedStatsCards, seedRecentActivities, seedRecentInvoices, seedInvoices } from "../seeders/index.js";

const router = express.Router();
const cleanDocs = (docs: any[]) =>
  docs.map(({ _id, __v, userId, ...rest }) => rest);

// Utility to group invoices into { date, invoices[] }
const groupInvoices = (invoices: any[]) => {
  return invoices.reduce((groups, inv) => {
    const group = groups.find((g: any) => g.date === inv.dateGroup);
    const invoiceItem = {
      id: inv.number,
      dueDate: new Date(inv.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount: inv.amount,
      status: inv.status,
    };

    if (group) {
      group.invoices.push(invoiceItem);
    } else {
      groups.push({
        date: inv.dateGroup,
        invoices: [invoiceItem],
      });
    }
    return groups;
  }, [] as { date: string; invoices: any[] }[]);
};

// Middleware: Firebase token
router.use(async (req: any, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    req.user = await verifyFirebaseToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// GET /api/dashboard
router.get("/", async (req: any, res) => {
  try {
    const userId = req.user.uid;

    // Check if this user already has data
    const existingStats = await StatsCard.findOne({ userId });

    if (!existingStats) {
      console.log("🌱 Seeding demo data for user:", userId);

      await seedStatsCards(userId);
      await seedRecentActivities(userId);
      await seedRecentInvoices(userId);
      await seedInvoices(userId);
    }

    // Always fetch and return dashboard data
    const [statsCards,invoices, recentInvoices, recentActivities] = await Promise.all([
      StatsCard.find({ userId }).lean(),
      Invoice.findOne({ userId }).lean(),
      RecentInvoice.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
      RecentActivity.find({ userId }).sort({ createdAt: -1 }).limit(4).lean(),
    ]);

    res.json({
      statsCards: cleanDocs(statsCards),
      invoices: invoices ? cleanDocs([invoices])[0] : null,
      recentInvoices: groupInvoices(cleanDocs(recentInvoices)),
      recentActivities: cleanDocs(recentActivities),
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard:", error);
    res.status(500).json({ error: "Server error fetching dashboard" });
  }
});

export default router;
