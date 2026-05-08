import Booking from '../models/Booking.js';
import Expert from '../models/Expert.js';
import { getIo } from '../socket/socketHandler.js';

export const createBooking = async (req, res, next) => {
  try {
    const { expertId, userName, email, phone, date, timeSlot, notes } = req.body;

    // 1. ATOMIC OPERATION to lock the slot to prevent race condition
    const updatedExpert = await Expert.findOneAndUpdate(
      { 
        _id: expertId, 
        "availableSlots.date": date, 
        "availableSlots.time": timeSlot, 
        "availableSlots.isBooked": false 
      },
      { 
        $set: { "availableSlots.$.isBooked": true } 
      },
      { new: true }
    );

    if (!updatedExpert) {
      return res.status(409).json({ 
        success: false, 
        message: "Slot already booked. Please choose another." 
      });
    }

    // 2. Create the booking document
    const booking = new Booking({
      expertId,
      userName,
      email,
      phone,
      date,
      timeSlot,
      notes
    });

    await booking.save();

    // 3. Emit real-time socket event
    const io = getIo();
    if (io) {
      io.to(expertId).emit("slotBooked", { expertId, date, timeSlot });
    }

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // If cancelled or failed, we'd theoretically release the slot. 
    // Omitting slot release for simplicity unless required.

    const io = getIo();
    if (io) {
      io.emit("bookingStatusUpdated", { bookingId: id, status });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

export const getBookingsByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email query parameter is required' });
    }

    // Case insensitive search
    const bookings = await Booking.find({ email: { $regex: new RegExp('^' + email + '$', 'i') } })
                                  .populate('expertId', 'name category profileImage')
                                  .sort({ createdAt: -1 });
    
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};
