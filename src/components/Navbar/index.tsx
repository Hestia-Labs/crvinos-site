'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import { PiCaretDownThin } from "react-icons/pi";
import clsx from 'clsx';
import { useDrawer } from '@/contexts/DrawerContext';
import { TransitionLink } from '@/utils/TransitionLink';
import Logo from '@/assets/Logo';
import { useCart } from '@/contexts/CartContext';

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
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const { openDrawer } = useDrawer();
  const { totalItems } = useCart();

  // Ref to hold the dropdown close timeout ID.
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handlers for the desktop dropdown with a delay on close.
  const handleDropdownMouseEnter = (itemName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setHoveredDropdown(itemName);
  };

  const handleDropdownMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
      closeTimeoutRef.current = null;
    }, 300); // Adjust delay (in ms) as needed
  };

  const toggleMenu = () => {
    setOpen(!open);
    
    // If opening the menu and a submenu item is active, open that submenu
    if (!open) {
      // Find if any submenu item matches the current path
      const activeParentItem = navItems.find(item => 
        item.submenu?.some(subItem => pathname === `/${subItem.route}`)
      );
      
      // If found, set that submenu to open
      if (activeParentItem) {
        setMobileSubmenuOpen(activeParentItem.name);
      } else {
        setMobileSubmenuOpen(null);
      }
    } else {
      setMobileSubmenuOpen(null);
    }
  };

  const navItems = [
    { name: 'Inicio', route: '', available: true },
    { name: 'Nosotros', route: 'about', available: true },
    { name: 'Catálogo', route: 'catalog', available: true },
    {
      name: 'Enoturismo',
      route: 'enotourism',
      available: true,
      submenu: [
        { name: 'Visión General', route: 'enotourism', available: true },
        { name: 'Eventos', route: 'enotourism/events', available: true },
        { name: 'Experiencias', route: 'experiences', available: true },
      ]
    },
    { name: 'Restaurante', route: 'restaurant', available: true },
    { name: 'Blog', route: 'blog', available: true },
    { name: 'Contacto', route: 'contact', available: true },
  ];

  return (
    <nav
      className={clsx(
        'w-full flex justify-between items-center px-8 py-2 z-20 top-0 left-0 right-0 md:px-16 md:py-4',
        { relative: relative, absolute: !relative }
      )}
    >
      {/* Background Overlays */}
      {clearBg && (
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
      )}
      {darkenBg && (
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent pointer-events-none" />
      )}
      {!noBg && !clearBg && !darkenBg && <div className="absolute z-10 inset-0 bg-transparent" />}

      {/* Logo */}
      <Logo
        red={redLogo}
        className="w-auto h-20 md:w-auto md:h-32 z-20 relative"
        link="/"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex px-9 z-20 pt-8 relative">
        <div className="flex py-2 space-x-8 w-full items-center">
          <div className="flex justify-center items-center md:text-base text-xs space-x-6">
            {navItems.map((item, index) => {
              const isActive =
                pathname === `/${item.route}` ||
                (item.submenu?.some((sub) => pathname === `/${sub.route}`));
              
              return (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => item.submenu && handleDropdownMouseEnter(item.name)}
                  onMouseLeave={item.submenu ? handleDropdownMouseLeave : undefined}
                >
                  <motion.div
                    whileHover={{ y: 0 }}
                    className={clsx(
                      'cursor-pointer flex justify-center items-center gap-1.5 px-3 py-2 rounded-lg transition-colors',
                      {
                        'text-crred hover:bg-crred/10': red,
                        'text-white hover:bg-white/10': !red,
                        'bg-crred/20': red && isActive,
                        'bg-white/20': !red && isActive,
                      },
                      { 'opacity-50 cursor-not-allowed': !item.available }
                    )}
                  >
                    <TransitionLink
                      href={`/${item.route}`}
                      className="flex items-center gap-0.5"
                    >
                      {item.name}
                      {item.submenu && (
                        <PiCaretDownThin  
                          className={clsx(
                            'w-5 h-5 transition-transform duration-300',
                            { 'text-crred/80': red },
                            { 'text-white/80': !red },
                            { 'rotate-180': hoveredDropdown === item.name }
                          )}
                        />
                      )}
                    </TransitionLink>
                  </motion.div>

                  {/* Desktop Dropdown */}
                  {item.submenu && hoveredDropdown === item.name && (
                    <motion.div
                      onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                      onMouseLeave={handleDropdownMouseLeave}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 rounded-2xl overflow-hidden min-w-[220px] bg-gradient-to-b from-back-95 to-back-90 text-gray-800 backdrop-blur-md shadow-xl border border-gray-200"
                    >
                      <div className="p-2">
                        {item.submenu.map((subItem, subIndex) => {
                          const isSubActive = pathname === `/${subItem.route}`;
                          return (
                            <motion.div
                              key={subIndex}
                              whileHover={{ 
                                backgroundColor: 'rgba(229, 231, 235, 0.8)',
                                scale: 1.02,
                                transition: { duration: 0.2 }
                              }}
                              className={clsx(
                                'px-6 py-3 transition-all duration-200 rounded-lg my-1',
                                {
                                  'bg-gray-200': isSubActive,
                                  'border-l-4 border-gray-600 font-semibold': isSubActive,
                                }
                              )}
                            >
                              <TransitionLink
                                href={`/${subItem.route}`}
                                className={clsx(
                                  "block whitespace-nowrap font-medium",
                                  { 
                                    'text-gray-900 opacity-100': isSubActive,
                                    'opacity-80': !isSubActive 
                                  }
                                )}
                              >
                                {subItem.name}
                              </TransitionLink>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center">
            <motion.div
              onClick={() => openDrawer('cart')}
              className="relative cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <IoBagHandleOutline
                className={clsx('text-2xl p-0', { 'text-back': !red, 'text-crred': red })}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-crred text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* Fixed border element */}
        <div
          className={clsx('absolute bottom-0 left-0 right-0 border-b-2', {
            'border-crred': red,
            'border-white': !red,
          })}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center space-x-4 z-20 relative">
        <div className="relative">
          <IoBagHandleOutline
            className={clsx('text-3xl cursor-pointer', { 'text-back': !red, 'text-crred': red })}
            onClick={() => openDrawer('cart')}
          />
          {totalItems > 0 && (
            <span
              className={clsx(
                'absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full',
                {
                  'bg-crred text-white': !red,
                  'bg-white text-crred': red,
                }
              )}
            >
              {totalItems}
            </span>
          )}
        </div>
        <button onClick={toggleMenu}>
          <HiOutlineMenu
            className={clsx('text-3xl', { 'text-crred': red, 'text-white': !red })}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-0 right-0 w-full h-full bg-[#914E56] bg-opacity-95 flex flex-col justify-start items-end p-8 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="text-white text-3xl mb-8" onClick={toggleMenu}>
              <HiOutlineX />
            </button>
            {navItems.map((item, index) => {
              const isSubmenuOpen = mobileSubmenuOpen === item.name;
              const isActive =
                pathname === `/${item.route}` ||
                (item.submenu?.some((sub) => pathname === `/${sub.route}`));

              return (
                <div key={index} className="w-full">
                  <motion.div
                    className={clsx(
                      'text-white text-4xl mb-4 flex justify-between items-center w-full cursor-pointer',
                      { 'font-semibold': isActive }
                    )}
                    onClick={() =>
                      item.submenu && setMobileSubmenuOpen(isSubmenuOpen ? null : item.name)
                    }
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <TransitionLink
                      href={!item.submenu ? `/${item.route}`: "#"}
                      onClick={(e) => {
                        if (!item.submenu) {
                          e.stopPropagation();
                          toggleMenu();
                        }
                      }}
                      className="flex-1"
                    >
                      {item.name}
                    </TransitionLink>
                    
                    {item.submenu && (
                      <div className="ml-4 text-2xl">
                        {isSubmenuOpen ? '−' : '+'}
                      </div>
                    )}
                  </motion.div>

                  {/* Mobile Submenu */}
                  {item.submenu && isSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-6 border-l-2 border-white/20"
                    >
                      {item.submenu.map((subItem, subIndex) => {
                        const isSubActive = pathname === `/${subItem.route}`;
                        return (
                          <motion.div
                            key={subIndex}
                            className={clsx(
                              "text-3xl mb-4 pl-4",
                              { "border-l-2 border-white": isSubActive }
                            )}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                          >
                            <TransitionLink
                              href={`/${subItem.route}`}
                              onClick={toggleMenu}
                              className={clsx(
                                'hover:text-white transition-colors',
                                { 
                                  'font-medium text-white opacity-100': isSubActive,
                                  'text-white/70': !isSubActive 
                                }
                              )}
                            >
                              {subItem.name}
                            </TransitionLink>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
