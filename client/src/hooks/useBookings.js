import { useQuery } from '@tanstack/react-query';
import { fetchBookingsByEmail } from '../api/bookingApi';

const useBookings = (email) => {
  return useQuery({
    queryKey: ['bookings', email],
    queryFn: () => fetchBookingsByEmail(email),
    enabled: !!email,
  });
};

export default useBookings;
