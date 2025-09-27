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
router.get("/", async (req: any, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.uid });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

// GET single invoice
router.get("/:id", async (req: any, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user.uid,
    });
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: "Invalid invoice ID" });
  }
});

// POST create invoice
router.post("/", async (req: any, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      userId: req.user.uid,
    });

    req.io.emit("invoice:created", invoice);
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: "Failed to create invoice", details: err });
  }
});

// PUT update invoice
router.put("/:id", async (req: any, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Invoice not found" });

    req.io.emit("invoice:updated", updated);

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid invoice ID" });
  }
});

// DELETE invoice
router.delete("/:id", async (req: any, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Invoice not found" });

    req.io.emit("invoice:deleted", deleted._id);

    res.json({ success: true, id: deleted._id });
  } catch (err) {
    res.status(400).json({ error: "Invalid invoice ID" });
  }
});

export default router;