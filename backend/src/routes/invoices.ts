import { Router } from "express";
import { Invoice } from "../models/Invoice.js";
import { verifyFirebaseToken } from "../utils/firebase.js";

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

// GET all invoices
router.get("/", async (_, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});

// POST create invoice
router.post("/", async (req: any, res) => {
  const invoice = await Invoice.create(req.body);

  // socket broadcast
  req.io.emit("invoice:created", invoice);

  res.json(invoice);
});

export default router;