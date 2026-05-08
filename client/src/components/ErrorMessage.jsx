import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col items-center justify-center text-center max-w-md mx-auto my-8 fade-in">
      <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
      <p className="text-red-800 font-medium">{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-white text-red-600 rounded-lg border border-red-200 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
