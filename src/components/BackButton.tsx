'use client';

import React from 'react';

type BackButtonProps = {
  className?: string;
  children: React.ReactNode;
};

const BackButton: React.FC<BackButtonProps> = ({ className, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <a 
      onClick={handleClick}
      href="#" 
      className={`cursor-pointer ${className || ''}`}
    >
      {children}
    </a>
  );
};

export default BackButton; 