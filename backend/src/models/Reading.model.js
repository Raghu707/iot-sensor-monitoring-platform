import mongoose from 'mongoose';

const ReadingSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true
    },
    temperature: Number,
    humidity: Number,
    battery: Number
  },
  { timestamps: true }
);

// ✅ explicitly map to soil_monitor.readings
export default mongoose.model('Reading', ReadingSchema, 'readings');