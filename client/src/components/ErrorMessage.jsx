import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="glass bg-red-500/5 border-red-500/20 p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto my-12 animate-shake">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-slate-400 font-medium mb-6">{message || 'We encountered an unexpected error.'}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2.5 bg-white/[0.04] text-red-400 rounded-xl border border-red-500/30 text-sm font-semibold hover:bg-red-500/20 hover:text-white hover:border-red-500/50 transition-all duration-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
