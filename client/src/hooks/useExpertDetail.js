import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExpertById } from '../api/expertApi';

const useExpertDetail = (id) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['expert', id],
    queryFn: () => fetchExpertById(id),
    enabled: !!id,
  });

  const updateSlotOptimistically = (date, timeSlot) => {
    queryClient.setQueryData(['expert', id], (oldData) => {
      if (!oldData) return oldData;
      
      const updatedSlots = oldData.availableSlots.map(slot => {
        if (slot.date === date && slot.time === timeSlot) {
          return { ...slot, isBooked: true };
        }
        return slot;
      });

      return { ...oldData, availableSlots: updatedSlots };
    });
  };

  return { ...query, updateSlotOptimistically };
};

export default useExpertDetail;
