import { Check } from 'lucide-react';

const Badge = ({ text }) => {
  const getBadgeConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          classes: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        };
      case 'confirmed':
        return {
          classes: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
        };
      case 'completed':
        return {
          classes: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
          icon: <Check className="w-3 h-3 text-indigo-400" />
        };
      default:
        return {
          classes: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
          icon: null
        };
    }
  };

  const { classes, icon } = getBadgeConfig(text);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${classes}`}>
      {icon}
      {text}
    </span>
  );
};

export default Badge;
