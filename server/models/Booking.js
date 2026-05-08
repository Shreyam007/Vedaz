import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const bookingSchema = new mongoose.Schema({
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

bookingSchema.index({ expertId: 1, date: 1, timeSlot: 1 }, { unique: true });
bookingSchema.plugin(uniqueValidator, { message: 'Slot already booked. Please choose another.' });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
