import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Technology', 'Finance', 'Health', 'Legal', 'Marketing', 'Design']
  },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  bio: { type: String, required: true },
  profileImage: { type: String, required: true },
  availableSlots: [slotSchema]
}, { timestamps: true });

const Expert = mongoose.model('Expert', expertSchema);
export default Expert;
