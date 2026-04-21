import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import readingsRoutes from "./routes/readings.routes.js";
import tuyaRoutes from "./routes/tuya.routes.js";

const app = express();

/* ✅ CORS – Express 5 compatible */
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://iot-frontend.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* ✅ IMPORTANT: THIS alone handles preflight */
app.use(express.json());

/* ✅ Routes */
app.use("/auth", authRoutes);
app.use("/api/readings", readingsRoutes);
app.use("/api/tuya", tuyaRoutes);

app.get("/", (_req, res) => {
  res.send("Backend running ✅");
});

export default app;
``
