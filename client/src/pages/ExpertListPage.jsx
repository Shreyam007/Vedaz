import { useState, useEffect } from 'react';
import useExperts from '../hooks/useExperts';
import ExpertCard from '../components/ExpertCard';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import { Search, Filter } from 'lucide-react';

const categories = ['All', 'Technology', 'Finance', 'Health', 'Legal', 'Marketing', 'Design'];

const ExpertListPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error, refetch } = useExperts({
    page,
    limit: 8,
    category: category === 'All' ? '' : category,
    search: debouncedSearch
  });

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Header & Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-primary mb-6">Find an Expert</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide items-center">
            <Filter className="text-gray-400 w-5 h-5 hidden md:block mr-2" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  (category === cat || (category === '' && cat === 'All'))
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {isError ? (
        <ErrorMessage message={error?.response?.data?.message || error.message} onRetry={refetch} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            ) : data?.data?.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500">
                <p className="text-lg">No experts found matching your criteria.</p>
                <button 
                  onClick={() => { setSearch(''); setCategory(''); }}
                  className="mt-4 text-accent hover:underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              data?.data?.map(expert => (
                <ExpertCard key={expert._id} expert={expert} />
              ))
            )}
          </div>

          {/* Pagination */}
          {!isLoading && data?.pagination && (
            <Pagination 
              currentPage={data.pagination.page} 
              totalPages={data.pagination.pages} 
              onPageChange={setPage} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExpertListPage;
