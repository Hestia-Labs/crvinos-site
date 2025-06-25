import React from 'react';

interface CircleBackgroundProps {
  className?: string;
}

/**
 * A simple circle background element for decorative purposes
 */
const CircleBackground: React.FC<CircleBackgroundProps> = ({ className = '' }) => {
  return (
    <div 
      className={`absolute rounded-full opacity-60 blur-xl ${className}`}
      aria-hidden="true"
    />
  );
};

export default CircleBackground; 