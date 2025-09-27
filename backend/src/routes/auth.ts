import { Router } from "express";
import { verifyFirebaseToken } from "../utils/firebase.js";

const router = Router();

// POST /auth/verify - confirm token is valid and return user info
router.post("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const user = await verifyFirebaseToken(token);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;