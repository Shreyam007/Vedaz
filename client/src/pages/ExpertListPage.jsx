import { useState, useEffect } from 'react';
import useExperts from '../hooks/useExperts';
import ExpertCard from '../components/ExpertCard';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import { Search, X } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <div className="relative min-h-[280px] overflow-hidden flex flex-col items-center justify-center pt-10 pb-16 px-4">
        {/* Background Orbs */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl top-0 left-[10%] animate-float pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-teal-500/[0.06] blur-3xl bottom-0 right-[10%] animate-float-reverse pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent mb-6 tracking-tight animate-fade-slide-up">
            Find Your Expert
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
            Connect with world-class professionals — real-time availability
          </p>
          
          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto group animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="glass ring-1 ring-white/[0.08] focus-within:ring-indigo-500/50 focus-within:shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-all duration-300 rounded-2xl flex items-center px-4 py-1">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search experts by name..."
                className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="p-2 text-slate-400 hover:text-white transition-colors animate-fade-slide-up"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* Filter Pills Row */}
        <div className="sticky top-20 z-40 bg-[#0A0F1E]/90 backdrop-blur-md py-4 mb-8 border-b border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => {
              const isActive = category === cat || (category === '' && cat === 'All');
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]'
                      : 'bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          
          <div className="text-sm text-slate-500 font-medium whitespace-nowrap hidden md:block">
            {isLoading ? 'Loading experts...' : `${data?.pagination?.total || 0} experts found`}
          </div>
        </div>

        {/* Expert Grid */}
        {isError ? (
          <ErrorMessage message={error?.response?.data?.message || error.message} onRetry={refetch} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              ) : data?.data?.length === 0 ? (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No experts found</h3>
                  <p className="text-slate-400">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => { setSearch(''); setCategory(''); }}
                    className="mt-6 px-6 py-2.5 bg-white/[0.04] text-white rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                data?.data?.map((expert, index) => (
                  <ExpertCard key={expert._id} expert={expert} index={index} />
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
    </div>
  );
};

export default ExpertListPage;
