import { Link } from 'react-router-dom';
import { Star, Briefcase, ArrowRight } from 'lucide-react';

const getCategoryGradient = (category) => {
  switch (category) {
    case 'Technology': return 'from-indigo-900 via-purple-900 to-slate-900';
    case 'Finance': return 'from-emerald-900 via-teal-900 to-slate-900';
    case 'Health': return 'from-rose-900 via-pink-900 to-slate-900';
    case 'Legal': return 'from-amber-900 via-orange-900 to-slate-900';
    case 'Marketing': return 'from-sky-900 via-blue-900 to-slate-900';
    case 'Design': return 'from-fuchsia-900 via-violet-900 to-slate-900';
    default: return 'from-slate-800 via-slate-900 to-slate-900';
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'Technology': return 'bg-indigo-500/20 text-indigo-400';
    case 'Finance': return 'bg-emerald-500/20 text-emerald-400';
    case 'Health': return 'bg-rose-500/20 text-rose-400';
    case 'Legal': return 'bg-amber-500/20 text-amber-400';
    case 'Marketing': return 'bg-sky-500/20 text-sky-400';
    case 'Design': return 'bg-fuchsia-500/20 text-fuchsia-400';
    default: return 'bg-slate-500/20 text-slate-400';
  }
};

const ExpertCard = ({ expert, index = 0 }) => {
  return (
    <Link 
      to={`/experts/${expert._id}`} 
      className="group block h-full animate-stagger-in opacity-0"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="glass h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] overflow-hidden relative">
        
        {/* Gradient Header */}
        <div className={`h-24 relative overflow-hidden bg-gradient-to-br ${getCategoryGradient(expert.category)}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-80" />
        </div>

        <div className="px-6 pb-6 flex flex-col flex-1 relative">
          {/* Avatar (overlapping) */}
          <div className="relative -mt-10 mb-4 inline-block">
            {expert.profileImage ? (
              <img 
                src={expert.profileImage} 
                alt={expert.name} 
                className="w-16 h-16 rounded-full object-cover border-[3px] border-[#0A0F1E] bg-[#0A0F1E]"
              />
            ) : (
              <div className={`w-16 h-16 rounded-full border-[3px] border-[#0A0F1E] flex items-center justify-center font-bold text-xl text-white bg-gradient-to-br ${getCategoryGradient(expert.category)}`}>
                {expert.name.charAt(0)}
              </div>
            )}
            
            {/* Category Badge - Absolutely positioned near avatar or just normal flow? Let's put it top right of card body */}
            <div className="absolute top-2 right-0 translate-x-full ml-4 whitespace-nowrap hidden sm:block">
               {/* This approach is complex, let's just put it in normal flow */}
            </div>
          </div>

          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-extrabold text-xl text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{expert.name}</h3>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${getCategoryColor(expert.category)} whitespace-nowrap`}>
              {expert.category}
            </span>
          </div>
          
          <p className="mt-2 text-slate-400 text-sm line-clamp-2 flex-1 font-normal leading-relaxed">
            {expert.bio}
          </p>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-400 pt-5 border-t border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>{expert.experience} yrs exp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-white">{expert.rating?.toFixed(1) || '5.0'}</span>
            </div>
          </div>

          {/* Hover Button */}
          <button className="mt-6 w-full rounded-xl py-2.5 font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2">
            View Profile 
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>
    </Link>
  );
};

export default ExpertCard;
