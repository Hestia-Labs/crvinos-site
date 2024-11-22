// Navbar.tsx

'use client';
import React, { useState } from 'react';
import Icon from "../Icons";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation'; 
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDrawer } from '@/contexts/DrawerContext';
import { CiUser } from "react-icons/ci";
import clsx from 'clsx';
import Link from 'next/link';
import { TransitionLink } from '@/utils/TransitionLink';
import Logo from '@/assets/Logo';

interface NavbarProps {
  red?: boolean;
  redLogo?: boolean;
  relative?: boolean;
  clearBg?: boolean;
  darkenBg?: boolean;
  noBg?: boolean;
}

export default function Navbar({ red, redLogo, relative, clearBg, darkenBg, noBg }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openDrawer } = useDrawer();

  const navItems = [
    { name: 'Nosotros', route: "about", available: true },
    { name: 'Catálogo', route: "catalog", available: true },
    { name: 'Blog', route: "blog", available: true },
    { name: 'Enoturismo', route: "enoturism", available: true },
    { name: 'Contacto', route: "contact", available: true },
  ];

  const iconItems = [
    { icon: <IoBagHandleOutline className={clsx('text-xl', { 'text-back': !red, 'text-crred': red })} />, action: () => { openDrawer('cart') } },
    { icon: <CiUser className={clsx('text-2xl', { 'text-back': !red, 'text-crred': red })} />, action: () => { router.push('/account') } }
  ];

  const handleNavigation = (route: string, available: boolean, event: React.MouseEvent) => {
    event.preventDefault();
    if (available) {
      setOpen(false);
      router.push(`/${route}`);
    }
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className={clsx(
      'w-full flex justify-between items-center px-8 py-2 z-20 top-0 left-0 right-0 md:px-16 md:py-4 ', // Ensure nav is relative for z-index to work
      { 'relative': relative, 'absolute': !relative }
    )}>
      
      {/* Background Overlays - placed first to be behind logo and nav items */}
      {clearBg && (
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>
      )}
      {darkenBg && (
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
      )}
      {!noBg && !clearBg && !darkenBg && (
        <div className="absolute z-10 inset-0 bg-transparent"></div>
      )}

      {/* Logo */}
      <Logo 
        red={redLogo} 
        className="w-auto h-20 md:w-auto md:h-32 z-20 relative " // Ensure logo has relative positioning and higher z-index
        link="/" 
      />

      {/* Desktop Navigation */}
      <div className={clsx('hidden md:flex border-b-2  px-8 z-20 pt-8 relative', { 'border-crred': red, 'border-white': !red })}>
        <div className="flex py-2 space-x-5">
          <div className='flex justify-center items-center md:text-sm text-xs space-x-8'>
            {navItems.map((item, index) => {
              const isActive = pathname === `/${item.route}`;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: item.available ? -2 : 0 }}
                  whileTap={{ y: item.available ? -2 : 0 }}
                  className={clsx(
                    'cursor-pointer',
                    { 'text-crred': red, 'text-white': !red },
                    { 'opacity-50 cursor-not-allowed': !item.available },
                    { 'underline font-semibold': isActive }
                  )}
                  onClick={(event) => handleNavigation(item.route, item.available, event)}
                >
                  <TransitionLink
                    href={`/${item.route}`}
                    className={clsx(
                      { 'cursor-not-allowed': !item.available, 'cursor-pointer': item.available }
                    )}
                  >
                    {item.name}
                  </TransitionLink>
                  {!item.available && (
                    <p className="text-xs text-gray-400">Próximamente</p>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="flex space-x-4">
            {iconItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={item.action}
                className="cursor-pointer"
                whileHover={{ y: -2 }}
                whileTap={{ y: -2 }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center space-x-4 z-20 relative">
        <IoBagHandleOutline
          className={clsx('text-2xl cursor-pointer', { 'text-back': !red, 'text-crred': red })}
          onClick={() => openDrawer('cart')}
        />
        <button onClick={toggleMenu}>
          <HiOutlineMenu className={clsx('text-2xl', { 'text-crred': red, 'text-white': !red })} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-0 right-0 w-full h-full bg-[#914E56] bg-opacity-90 flex flex-col justify-start items-end p-8 z-30" // Ensure mobile menu is above nav (z-30 > z-20)
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="text-white text-3xl mb-8" onClick={toggleMenu}>
              <HiOutlineX />
            </button>
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                className={clsx(
                  "text-white text-4xl mb-10 flex text-left",
                  { 'font-semibold underline': pathname === `/${item.route}` }
                )}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                exit={{
                  y: 30,
                  opacity: 0,
                  transition: { duration: 0.2 }
                }}
              >
                <TransitionLink
                  href={`/${item.route}`}
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  {item.name}
                </TransitionLink>
              </motion.div>
            ))}
            <motion.div
              className={clsx(
                "text-white text-4xl mb-10 flex text-left",
                { 'font-semibold underline': pathname === '/account' }
              )}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * navItems.length }}
              exit={{
                y: 30,
                opacity: 0,
                transition: { duration: 0.2 }
              }}
            >
              <TransitionLink
                href="/account"
                onClick={() => {
                  toggleMenu();
                }}
              >
                Cuenta
              </TransitionLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
