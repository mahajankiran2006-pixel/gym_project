import express from 'express';
import Trainer from '../models/Trainer.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public - list active trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(trainers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - create trainer
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - update trainer
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - delete trainer
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json({ message: 'Trainer removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
