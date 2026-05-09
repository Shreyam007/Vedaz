import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ show, message, type }) => {
  if (!show) return null;

  const getConfig = () => {
    switch (type) {
      case 'error': return { border: 'border-l-red-500', icon: <XCircle className="w-5 h-5 text-red-500" /> };
      case 'warning': return { border: 'border-l-amber-500', icon: <AlertTriangle className="w-5 h-5 text-amber-500" /> };
      case 'info': return { border: 'border-l-indigo-500', icon: <Info className="w-5 h-5 text-indigo-500" /> };
      default: return { border: 'border-l-emerald-500', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> };
    }
  };

  const { border, icon } = getConfig();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-toast-in">
      <div className={`glass relative overflow-hidden flex items-center gap-3 px-5 py-4 border-l-[4px] ${border}`}>
        {icon}
        <span className="font-medium text-white">{message}</span>
        
        {/* Progress drain bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 animate-progress-drain" />
      </div>
    </div>
  );
};

export default Toast;
