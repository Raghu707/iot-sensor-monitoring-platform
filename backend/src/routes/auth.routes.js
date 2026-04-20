import express from "express";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/db.js";

const router = express.Router();

/**
 * ✅ REGISTER
 * POST /auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const db = await connectDB();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await users.insertOne({
      email,
      password, // ✅ plaintext for now (we can hash later)
      createdAt: new Date()
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ LOGIN
 * POST /auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const db = await connectDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT (THIS WAS MISSING BEFORE)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;