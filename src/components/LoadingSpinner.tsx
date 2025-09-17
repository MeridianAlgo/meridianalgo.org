import React from 'react';

const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-gray-700"></div>
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-orange-400 border-t-transparent`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
