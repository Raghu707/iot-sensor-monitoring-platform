import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

/* Load environment variables */
dotenv.config();

/* Use PORT from Render, fallback for local */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ connect MongoDB first

    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
