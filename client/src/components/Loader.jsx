const Loader = () => {
  return (
    <div className="flex justify-center items-center p-20 animate-fade-slide-up">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-pulse-glow" />
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 border-r-teal-500 rounded-full animate-spin-slow" />
        
        {/* Inner core */}
        <div className="w-8 h-8 bg-indigo-500/20 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
