import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (expertId, onSlotBooked) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

    socketRef.current.on('connect', () => {
      if (expertId) {
        socketRef.current.emit('joinExpertRoom', expertId);
      }
    });

    socketRef.current.on('slotBooked', (data) => {
      if (onSlotBooked) {
        onSlotBooked(data);
      }
    });

    return () => {
      if (expertId && socketRef.current) {
        socketRef.current.emit('leaveExpertRoom', expertId);
      }
      socketRef.current.disconnect();
    };
  }, [expertId, onSlotBooked]);

  return socketRef.current;
};

export default useSocket;
