import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'alert' | 'purple' | 'linkedin' | 'instagram';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  id
}) => {
  const baseStyle = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none border tracking-wide uppercase text-[10px]';

  const variants = {
    primary: 'bg-indigo-950/40 text-indigo-300 border-indigo-900/50',
    secondary: 'bg-zinc-800/60 text-zinc-300 border-zinc-700/50',
    success: 'bg-emerald-950/40 text-emerald-300 border-emerald-900/50',
    warning: 'bg-amber-950/40 text-amber-300 border-amber-900/50',
    alert: 'bg-rose-950/40 text-rose-300 border-rose-900/50',
    purple: 'bg-purple-950/40 text-purple-300 border-purple-900/50',
    linkedin: 'bg-blue-950/60 text-blue-300 border-blue-900/60 font-medium',
    instagram: 'bg-pink-950/60 text-pink-300 border-pink-900/60 font-medium'
  };

  return (
    <span id={id} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
export default Badge;
