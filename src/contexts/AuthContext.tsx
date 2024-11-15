'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  login: () => Promise<boolean>;
  logout: () => void;
  setIsLoggingIn: (status: boolean) => void; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const loggingInStatus = localStorage.getItem('isLoggingIn');

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    if (loggingInStatus === 'true') {
      setIsLoggingIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    localStorage.setItem('isLoggingIn', isLoggingIn ? 'true' : 'false');
  }, [isLoggedIn, isLoggingIn]);

  const login = useCallback(async () => {
    setIsLoggedIn(true);
    setIsLoggingIn(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsLoggingIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isLoggingIn');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoggingIn, login, logout, setIsLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
