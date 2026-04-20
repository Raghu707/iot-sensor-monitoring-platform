import express from 'express';
import Moisture from '../models/Moisture.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * GET ALL DATA (History)
 */
router.get('/', authMiddleware, async (req, res) => {
  const data = await Moisture.find({ userId: req.user.id })
    .sort({ createdAt: 1 });

  res.json(data);
});

/**
 * GET LATEST DATA (Dashboard)
 */
router.get('/latest', authMiddleware, async (req, res) => {
  const latest = await Moisture.findOne({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(latest);
});

export default router;