import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:hover:bg-white/[0.02] disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${
              currentPage === i + 1 
                ? 'bg-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)] scale-105' 
                : 'bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:hover:bg-white/[0.02] disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
