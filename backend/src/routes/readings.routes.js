import express from "express";
import { connectDB } from "../config/db.js";

const router = express.Router();

/**
 * ✅ GET ALL READINGS (History)
 * /api/readings
 */
router.get("/latest", async (req, res) => {
  try {
    const db = await connectDB();
    const latest = await db
      .collection("readings")
      .find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    res.json(latest[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const readings = await db
      .collection("readings")
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    res.json(readings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;