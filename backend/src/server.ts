import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import invoiceRoutes from "./routes/invoices.js";
import dashboardRoutes from "./routes/dashboard.js";
import setupSockets from "./sockets/index.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.IO server
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Inject io into req object
app.use((req: any, _, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Invoice App API running ✅");
});

// MongoDB connection
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.DB_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => {
    // console.log("✅ MongoDB connected");
    httpServer.listen(PORT, () => console.log(`🚀 Server running on port`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Socket.IO setup
setupSockets(io);