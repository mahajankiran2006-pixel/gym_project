import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    itemType: { type: String, enum: ['course', 'product'], required: true },
    itemRef: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'items.itemType' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['TEST_CARD', 'COD'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    status: { type: String, enum: ['new', 'processing', 'completed', 'cancelled'], default: 'new' },
    shippingAddress: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
