let ioInstance;

const socketHandler = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Client joins room for specific expert to listen for slot bookings
    socket.on('joinExpertRoom', (expertId) => {
      socket.join(expertId);
      console.log(`Socket ${socket.id} joined room ${expertId}`);
    });

    socket.on('leaveExpertRoom', (expertId) => {
      socket.leave(expertId);
      console.log(`Socket ${socket.id} left room ${expertId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export const getIo = () => {
  return ioInstance;
};

export default socketHandler;
