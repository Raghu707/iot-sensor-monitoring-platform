import mongoose from 'mongoose';

const MoistureSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    deviceId: String,
    moisture: Number
  },
  { timestamps: true }
);

export default mongoose.model('Moisture', MoistureSchema);