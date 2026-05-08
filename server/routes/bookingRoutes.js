import express from 'express';
import { createBooking, updateBookingStatus, getBookingsByEmail } from '../controllers/bookingController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post('/', 
  [
    body('expertId').isMongoId().withMessage('Invalid Expert ID'),
    body('userName').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('timeSlot').notEmpty().withMessage('Time slot is required')
  ],
  validate, 
  createBooking
);

router.patch('/:id/status',
  [
    body('status').isIn(['Pending', 'Confirmed', 'Completed']).withMessage('Invalid status')
  ],
  validate,
  updateBookingStatus
);

router.get('/', getBookingsByEmail);

export default router;
