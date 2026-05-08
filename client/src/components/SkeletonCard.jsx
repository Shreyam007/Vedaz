const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse h-full">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="mt-6 flex justify-between pt-4 border-t border-gray-50">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
