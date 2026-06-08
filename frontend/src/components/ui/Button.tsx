import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10 border border-indigo-500/20',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/50',
    ghost: 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100',
    danger: 'bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800/50',
    premium: 'bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:brightness-110 text-white shadow-lg shadow-indigo-500/10 border border-indigo-500/30'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
