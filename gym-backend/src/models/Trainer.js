import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    specialty: { type: String },
    imageUrl: { type: String },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
