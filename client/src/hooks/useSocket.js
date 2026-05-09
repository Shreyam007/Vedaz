import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (expertId, events = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

    socketRef.current.on('connect', () => {
      if (expertId) {
        socketRef.current.emit('joinExpertRoom', expertId);
      }
    });

    socketRef.current.on('slotBooked', (data) => {
      if (events.onSlotBooked) {
        events.onSlotBooked(data);
      }
    });

    socketRef.current.on('bookingStatusUpdated', (data) => {
      if (events.onBookingStatusUpdated) {
        events.onBookingStatusUpdated(data);
      }
    });

    return () => {
      if (expertId && socketRef.current) {
        socketRef.current.emit('leaveExpertRoom', expertId);
      }
      socketRef.current.disconnect();
    };
  }, [expertId, events.onSlotBooked, events.onBookingStatusUpdated]);

  return socketRef.current;
};

export default useSocket;
