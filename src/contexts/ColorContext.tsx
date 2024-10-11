"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ColorContextProps {
  isRed: boolean;
  redOn: () => void;
  redOff: () => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isRed, setIsRed] = useState(false);

  const redOn = () => {
    setIsRed(true);
  };

  const redOff = () => {
    setIsRed(false);
  };

  return (
    <ColorContext.Provider value={{ isRed, redOn, redOff }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};
