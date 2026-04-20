import { getToken, getDeviceStatus } from '../tuya.js';
import { connectDB } from '../config/db.js';
import express from 'express';

const router = express.Router();

router.post('/refresh', async (req, res) => {
  try {
    const db = await connectDB();
    const readings = db.collection('readings');

    const token = await getToken();
    const status = await getDeviceStatus(token);

    let temperatureC = null;
    let humidity = null;
    let battery = null;

    status.forEach(item => {
      if (item.code === 'temp_current') {
        temperatureC = item.value / 10;
      }
      if (item.code === 'humidity') {
        humidity = item.value;
      }
      if (item.code === 'battery_percentage') {
        battery = item.value;
      }
    });

    const record = {
      deviceId: process.env.DEVICE_ID,
      temperatureC,
      humidity,
      battery,
      createdAt: new Date()
    };

    await readings.insertOne(record);

    res.json({
      success: true,
      record
    });
  } catch (err) {
    console.error('❌ Tuya refresh failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;