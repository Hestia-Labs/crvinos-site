"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
 
interface DrawerContextProps {
  isOpen: boolean;
  openDrawer: (drawerType: string) => void;
  closeDrawer: () => void;
  activeDrawer: string | null;
}
 
const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

 
export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const openDrawer = (drawerType: string) => {
    setActiveDrawer(drawerType);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setActiveDrawer(null);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, activeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
 
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
