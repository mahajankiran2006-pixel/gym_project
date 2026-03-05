import express from 'express';
import Order from '../models/Order.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// User - create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, shippingAddress, cardNumber, cardCvv, cardExpiry } = req.body;

    if (!items || !items.length || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: 'Missing order fields' });
    }

    let paymentStatus = 'pending';

    if (paymentMethod === 'TEST_CARD') {
      // Very simple fake card validation: card 4242424242424242 and 3+ digit CVV
      if (cardNumber === '4242424242424242' && cardCvv && String(cardCvv).length >= 3) {
        paymentStatus = 'paid';
      } else {
        return res.status(400).json({ message: 'Test card details are invalid' });
      }
    } else if (paymentMethod === 'COD') {
      paymentStatus = 'pending';
    } else {
      return res.status(400).json({ message: 'Unsupported payment method' });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      shippingAddress,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User - list own orders
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - list all orders
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - update order status/paymentStatus
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
