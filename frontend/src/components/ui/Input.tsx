import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 ${
            icon ? 'pl-9' : 'px-3'
          } py-2 ${error ? 'border-rose-900 focus:border-rose-500 focus:ring-rose-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="block mt-1 text-xs text-rose-400">{error}</span>}
    </div>
  );
};
export default Input;
