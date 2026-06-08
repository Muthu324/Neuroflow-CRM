import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  borderAccent?: boolean;
  statCard?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glass = true,
  borderAccent = false,
  statCard = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'rounded-xl border transition-all duration-300';
  
  const glassStyle = statCard
    ? 'stat-card'
    : glass 
    ? 'glass shadow-xl'
    : 'bg-zinc-950 border-zinc-905 border-zinc-900/80 shadow-lg';

  const hoverStyle = hoverEffect 
    ? 'hover:-translate-y-1 hover:shadow-2xl hover:border-zinc-700/80' 
    : '';

  const accentStyle = borderAccent 
    ? 'relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-violet-500 before:to-indigo-500' 
    : '';

  return (
    <div
      className={`${baseStyle} ${glassStyle} ${hoverStyle} ${accentStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
