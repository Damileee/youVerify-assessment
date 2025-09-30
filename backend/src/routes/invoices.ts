import { Router } from "express";
import { RecentInvoice } from '../models/RecentInvoice.js';
import { RecentActivity } from "../models/RecentActivity.js";
import { verifyFirebaseToken } from "../utils/firebase.js";
import { nanoid } from 'nanoid';

const router = Router();

// Middleware: check Firebase token
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

// POST /invoices/duplicate
router.post("/duplicate", async (req: any, res) => {
  try {
    // Find the most recent invoice by createdAt, then _id as tiebreaker
    const recentInvoice = await RecentInvoice.findOne()
      .sort({ createdAt: -1 });

    if (!recentInvoice) {
      return res.status(404).json({ error: "No invoices to duplicate" });
    }

    // Format today as: "TODAY - 27TH NOVEMBER, 2022"
    const today = new Date();
    const day = today.getDate();
    const daySuffix = (d: number) => {
      if (d > 3 && d < 21) return "TH";
      switch (d % 10) {
        case 1: return "ST";
        case 2: return "ND";
        case 3: return "RD";
        default: return "TH";
      }
    };
    const month = today.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const year = today.getFullYear();
    const formattedDateGroup = `TODAY - ${day}${daySuffix(day)} ${month}, ${year}`;

    // Duplicate invoice
    const duplicatedDate = new Date();
    const duplicatedInvoice = new RecentInvoice({
      ...recentInvoice.toObject(),
      _id: undefined,
      id: nanoid(),
      createdAt: today,
      updatedAt: today,
      dateGroup: formattedDateGroup,
    });
    await duplicatedInvoice.save();

    // Create activity log
    const recentActivity = await RecentActivity.create({
      id: duplicatedInvoice._id,
      title: "Invoice duplicated",
      timestamp: new Date().toLocaleString("en-US", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      description: `Duplicated invoice <b>00239434/Olaniyi Ojo Adewale</b>`,
      userId: req.user.uid,
    });

    // Group only the duplicated invoice
    const groupedInvoice = [
      {
        date: formattedDateGroup,
        invoices: [
          {
            id: duplicatedInvoice.number,
            dueDate: new Date(duplicatedInvoice.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            amount: duplicatedInvoice.amount,
            status: duplicatedInvoice.status,
          },
        ],
      },
    ];

    // 🔥 Socket events
    req.io.emit("invoice:duplicated", groupedInvoice);
    req.io.emit("recentActivity:created", recentActivity);

    res.json({
      success: true,
      recentInvoice: groupedInvoice,
      recentActivity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;