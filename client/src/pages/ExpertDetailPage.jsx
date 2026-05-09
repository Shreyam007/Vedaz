import { useParams } from 'react-router-dom';
import useExpertDetail from '../hooks/useExpertDetail';
import useSocket from '../hooks/useSocket';
import SlotGrid from '../components/SlotGrid';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Star, Briefcase, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const getCategoryGradient = (category) => {
  switch (category) {
    case 'Technology': return 'from-indigo-500 to-purple-500';
    case 'Finance': return 'from-emerald-500 to-teal-500';
    case 'Health': return 'from-rose-500 to-pink-500';
    case 'Legal': return 'from-amber-500 to-orange-500';
    case 'Marketing': return 'from-sky-500 to-blue-500';
    case 'Design': return 'from-fuchsia-500 to-violet-500';
    default: return 'from-slate-500 to-slate-400';
  }
};

const ExpertDetailPage = () => {
  const { id } = useParams();
  const { data: expert, isLoading, isError, error, refetch, updateSlotOptimistically } = useExpertDetail(id);

  useSocket(id, (payload) => {
    if (payload.expertId === id) {
      updateSlotOptimistically(payload.date, payload.timeSlot);
    }
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error?.response?.data?.message || error.message} onRetry={refetch} />;
  if (!expert) return <ErrorMessage message="Expert not found." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-slide-up">
      <Link to="/experts" className="inline-flex items-center text-slate-400 hover:text-white transition-colors font-semibold mb-8 group">
        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mr-3 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        Back to Experts
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN - Profile */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <div className="glass p-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${getCategoryGradient(expert.category)} pointer-events-none`} />

            <div className="flex flex-col items-center text-center">
              {/* Avatar with Gradient Ring */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 -m-1 rounded-full bg-gradient-to-tr ${getCategoryGradient(expert.category)} animate-spin-slow`} style={{ animationDuration: '4s' }} />
                <div className="relative w-24 h-24 rounded-full border-4 border-[#0A0F1E] bg-[#0A0F1E] overflow-hidden">
                  {expert.profileImage ? (
                    <img src={expert.profileImage} alt={expert.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center font-bold text-3xl text-white bg-gradient-to-br ${getCategoryGradient(expert.category)}`}>
                      {expert.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-3xl font-extrabold text-white mb-2">{expert.name}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(expert.category)}`}>
                  {expert.category}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Verified
                </span>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl py-3 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-lg">{expert.rating?.toFixed(1) || '5.0'}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Rating</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl py-3 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-white mb-1">
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-lg">{expert.experience}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Years Exp</span>
                </div>
              </div>

              <div className="text-left w-full">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">About Expert</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {expert.bio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Booking */}
        <div className="w-full lg:w-3/5 lg:sticky lg:top-28">
          <div className="glass p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-1">Available Sessions</h2>
                <p className="text-slate-400 text-sm">Select a time slot in your local time zone.</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live</span>
              </div>
            </div>
            
            <SlotGrid slots={expert.availableSlots} expertId={expert._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
