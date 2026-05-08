import axiosInstance from './axiosInstance';

export const createBooking = async (bookingData) => {
  const response = await axiosInstance.post('/bookings', bookingData);
  return response.data;
};

export const fetchBookingsByEmail = async (email) => {
  const response = await axiosInstance.get(`/bookings?email=${encodeURIComponent(email)}`);
  return response.data.data;
};
