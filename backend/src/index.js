import express from 'express';
import mongoose from 'mongoose';

// --- Create Express App ---
const app = express();
app.use(express.json());

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// --- Health Check Route ---
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// --- Start Server (MANDATORY FOR RENDER) ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});