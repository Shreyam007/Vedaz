const SkeletonCard = () => {
  return (
    <div className="glass h-full flex flex-col overflow-hidden relative">
      {/* Header Skeleton */}
      <div className="h-24 bg-slate-800/50 animate-shimmer" style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
        backgroundSize: '200% 100%'
      }} />

      <div className="px-6 pb-6 flex flex-col flex-1">
        {/* Avatar Skeleton */}
        <div className="-mt-10 mb-4">
          <div className="w-16 h-16 rounded-full border-[3px] border-[#0A0F1E] bg-slate-800 animate-shimmer" style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
            backgroundSize: '200% 100%'
          }} />
        </div>

        {/* Name and Category Skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 h-5 rounded bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
          <div className="w-16 h-5 rounded-full bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
        </div>

        {/* Bio lines Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="w-full h-3 rounded bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
          <div className="w-4/5 h-3 rounded bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
        </div>

        <div className="flex-1" />

        {/* Stats Row Skeleton */}
        <div className="pt-4 border-t border-white/[0.04] flex justify-between mb-6">
          <div className="w-20 h-4 rounded bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
          <div className="w-12 h-4 rounded bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-10 rounded-xl bg-slate-800 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)', backgroundSize: '200% 100%' }} />
      </div>
    </div>
  );
};

export default SkeletonCard;
