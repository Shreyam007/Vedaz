import { useQuery } from '@tanstack/react-query';
import { fetchExperts } from '../api/expertApi';

const useExperts = ({ page, limit, category, search }) => {
  return useQuery({
    queryKey: ['experts', { page, limit, category, search }],
    queryFn: () => fetchExperts({ page, limit, category, search }),
    keepPreviousData: true,
  });
};

export default useExperts;
