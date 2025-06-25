'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import { PiCaretDownThin } from "react-icons/pi";
import clsx from 'clsx';
import { useDrawer } from '@/contexts/DrawerContext';
import Logo from '@/assets/Logo';
import { useCart } from '@/contexts/CartContext';
import TransitionLink from '@/components/TransitionLink';


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

  // Desktop dropdown handlers
  const handleMenuItemClick = (route: string) => {
    router.push(`/${route}`);
    setOpen(false);
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
        { name: 'Recorridos', route: 'enotourism/experiences?category=Tours', available: true },
        { name: 'Experiencias', route: 'enotourism/experiences?category=Experiencias', available: true },
        { name: 'Eventos', route: 'enotourism/events', available: true },
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
                (item.route === '' && pathname === '/') ||
                (item.route !== '' && pathname.startsWith(`/${item.route}`)) ||
                (item.submenu?.some((sub) => pathname.startsWith(`/${sub.route}`)));
              
              return (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => item.submenu && handleDropdownMouseEnter(item.name)}
                  onMouseLeave={item.submenu ? handleDropdownMouseLeave : undefined}
                >
                  <motion.div
                    whileHover={{ y: -1 }}
                    className={clsx(
                      'cursor-pointer flex justify-center items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200',
                      {
                        'text-crred hover:text-crred': red,
                        'text-white hover:text-white/90': !red,
                        'bg-crred/20': red && isActive,
                        'bg-white/20': !red && isActive,
                      },
                      { 'opacity-50 cursor-not-allowed': !item.available }
                    )}
                  >
                    {item.submenu ? (
                      <div className="flex items-center gap-0.5">
                        <TransitionLink
                          href={`/${item.route}`}
                          className="mr-0.5"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {item.name}
                        </TransitionLink>
                        <PiCaretDownThin  
                          className={clsx(
                            'w-5 h-5 transition-transform duration-300',
                            { 'text-crred/80': red },
                            { 'text-white/80': !red },
                            { 'rotate-180': hoveredDropdown === item.name }
                          )}
                        />
                      </div>
                    ) : (
                      <TransitionLink
                        href={`/${item.route}`}
                        className="flex items-center gap-0.5"
                      >
                        {item.name}
                      </TransitionLink>
                    )}
                  </motion.div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div 
                      className={clsx(
                        "h-0.5 w-full absolute -bottom-1 left-0",
                        { 'bg-crred': red, 'bg-white': !red }
                      )}
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}

                  {/* Desktop Dropdown */}
                  {item.submenu && hoveredDropdown === item.name && (
                    <motion.div
                      onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                      onMouseLeave={handleDropdownMouseLeave}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 rounded-lg overflow-hidden min-w-[220px] bg-gradient-to-b from-white to-gray-50 text-gray-800 shadow-lg border border-gray-100"
                    >
                      {/* Top accent bar */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-crred/30 via-crred to-crred/30"></div>
                      
                      <div className="py-2">
                        {item.submenu.map((subItem, subIndex) => {
                          const isSubActive = pathname === `/${subItem.route}`;
                          return (
                            <motion.div
                              key={subIndex}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * subIndex, duration: 0.2 }}
                              className={clsx(
                                'transition-all duration-200 hover:bg-crred/5 mx-1.5 my-1 rounded overflow-hidden',
                                {
                                  'bg-crred/5 border-l-2 border-crred': isSubActive,
                                  'border-l-2 border-transparent': !isSubActive
                                }
                              )}
                            >
                              <TransitionLink
                                href={`/${subItem.route}`}
                                className={clsx(
                                  "block whitespace-nowrap text-sm px-5 py-2.5 font-light tracking-wide",
                                  { 
                                    'text-crred font-medium': isSubActive,
                                    'text-gray-700 hover:text-crred': !isSubActive 
                                  }
                                )}
                              >
                                {subItem.name}
                              </TransitionLink>
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      {/* Bottom decorative element */}
                      <div className="flex items-center justify-center py-1 opacity-70">
                        <div className="h-px w-1/3 bg-gradient-to-r from-transparent to-crred/30"></div>
                        <div className="mx-2 text-crred">
                          <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                        </div>
                        <div className="h-px w-1/3 bg-gradient-to-l from-transparent to-crred/30"></div>
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
            className="fixed top-0 right-0 w-full h-full bg-[#914E56] flex flex-col justify-start items-end p-8 z-30"
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
                (item.route === '' && pathname === '/') ||
                (item.route !== '' && pathname.startsWith(`/${item.route}`)) ||
                (item.submenu?.some((sub) => pathname.startsWith(`/${sub.route}`)));

              return (
                <div key={index} className="w-full">
                  <motion.div
                    className={clsx(
                      'text-white font-light text-4xl mb-4 flex justify-between items-center w-full cursor-pointer',
                      { 'font-normal': isActive }
                    )}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {!item.submenu ? (
                      <TransitionLink
                        href={`/${item.route}`}
                        onClick={() => toggleMenu()}
                        className="flex-1"
                      >
                        {item.name}
                      </TransitionLink>
                    ) : (
                      <div className="flex w-full justify-between items-center">
                        <TransitionLink
                          href={`/${item.route}`}
                          onClick={() => toggleMenu()}
                          className="flex-1"
                        >
                          {item.name}
                        </TransitionLink>
                        <div 
                          className="ml-4 text-2xl"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMobileSubmenuOpen(isSubmenuOpen ? null : item.name);
                          }}
                        >
                          {isSubmenuOpen ? '−' : '+'}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Mobile Submenu */}
                  {item.submenu && isSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 border-l-2 border-white/20 pl-4 mb-2"
                    >
                      {item.submenu.map((subItem, subIndex) => {
                        const isSubActive = pathname === `/${subItem.route}`;
                        return (
                          <motion.div
                            key={subIndex}
                            className={clsx(
                              "text-2xl mb-4",
                              { "border-l-2 border-white pl-3 -ml-4": isSubActive }
                            )}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.05 * subIndex }}
                          >
                            <TransitionLink
                              href={`/${subItem.route}`}
                              onClick={() => toggleMenu()}
                              className={clsx(
                                'transition-colors',
                                { 
                                  'font-normal text-white': isSubActive,
                                  'text-white/80 hover:text-white': !isSubActive 
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
