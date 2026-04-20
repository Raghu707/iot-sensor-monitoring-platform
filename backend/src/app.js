import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import readingsRoutes from "./routes/readings.routes.js";
import tuyaRoutes from "./routes/tuya.routes.js";

const app = express();

/* ✅ CORS FIX — no wildcard OPTIONS */
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* ✅ Body parser */
app.use(express.json());

/* ✅ Routes */
app.use("/auth", authRoutes);
app.use("/api/readings", readingsRoutes);
app.use("/api/tuya", tuyaRoutes);

app.get("/", (_req, res) => {
  res.send("Backend running ✅");
});

export default app;