import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3'
  };

  const ringStyle = `${sizes[size]} border-zinc-800 border-t-indigo-500 rounded-full animate-spin`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className={ringStyle}></div>
          <span className="text-xs text-zinc-400 font-mono animate-pulse uppercase tracking-widest">NeuroFlow Loading</span>
        </div>
      </div>
    );
  }

  return <div className={ringStyle}></div>;
};

// Polished skeleton card loader for bento components
export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-6 bg-zinc-900 rounded-md w-1/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-zinc-900 rounded-md w-full"></div>
        <div className="h-4 bg-zinc-900 rounded-md w-5/6"></div>
        <div className="h-4 bg-zinc-900 rounded-md w-4/5"></div>
      </div>
    </div>
  );
};
export default Loader;
