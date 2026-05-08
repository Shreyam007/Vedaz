import { CheckCircle2, XCircle } from 'lucide-react';

const Toast = ({ show, message, type }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 fade-in">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      }`}>
        {type === 'error' ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
